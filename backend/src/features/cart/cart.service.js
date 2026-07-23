const redis = require('../../shared/utils/redis');
const Product = require('../product/product.model');
const { APIError } = require('../../shared/middleware/errorHandler.middleware');

const GUEST_TTL = 86400; // 24 hours in seconds
const USER_TTL = 604800; // 7 days in seconds

/**
 * Generates the cache namespace key for a cart.
 */
const getCartKey = (userId, sessionId) => {
  if (userId) return `cart:user:${userId}`;
  return `cart:guest:${sessionId}`;
};

/**
 * Returns cache TTL in seconds.
 */
const getCartTTL = (userId) => {
  return userId ? USER_TTL : GUEST_TTL;
};

/**
 * Verifies if there is adequate inventory to reserve cart quantity.
 */
const validateStock = async (productId, variantSku, quantity) => {
  const product = await Product.findOne({ _id: productId, isActive: true });
  if (!product) {
    throw new APIError(404, 'Product not found or inactive.');
  }

  if (variantSku) {
    const variant = product.variants.find((v) => v.sku === variantSku);
    if (!variant) {
      throw new APIError(404, `Product variant SKU '${variantSku}' not found.`);
    }
    if (variant.inventory < quantity) {
      throw new APIError(400, `Insufficient inventory for variant '${variant.name}'. Stock available: ${variant.inventory}`);
    }
  } else {
    if (product.inventory < quantity) {
      throw new APIError(400, `Insufficient inventory for product '${product.name}'. Stock available: ${product.inventory}`);
    }
  }
  return product;
};

/**
 * Fetches cart list from Redis.
 */
const getCart = async (userId, sessionId) => {
  const key = getCartKey(userId, sessionId);
  const raw = await redis.get(key);
  return raw ? JSON.parse(raw) : { items: [] };
};

/**
 * Saves cart list to Redis and resets TTL.
 */
const saveCart = async (userId, sessionId, cart) => {
  const key = getCartKey(userId, sessionId);
  const ttl = getCartTTL(userId);
  await redis.set(key, JSON.stringify(cart), 'EX', ttl);
};

/**
 * Adds an item to the cart.
 */
const addItemToCart = async (userId, sessionId, item) => {
  const { productId, variantSku, quantity, giftBoxing } = item;

  await validateStock(productId, variantSku, quantity);

  const cart = await getCart(userId, sessionId);
  const index = cart.items.findIndex(
    (i) => i.productId === productId && i.variantSku === variantSku
  );

  if (index > -1) {
    const combinedQuantity = cart.items[index].quantity + quantity;
    await validateStock(productId, variantSku, combinedQuantity);
    cart.items[index].quantity = combinedQuantity;
    if (giftBoxing) {
      cart.items[index].giftBoxing = giftBoxing;
    }
  } else {
    cart.items.push({ productId, variantSku, quantity, giftBoxing });
  }

  await saveCart(userId, sessionId, cart);
  return cart;
};

/**
 * Updates cart item details.
 */
const updateCartItem = async (userId, sessionId, itemId, updates) => {
  const { quantity, giftBoxing } = updates;
  const cart = await getCart(userId, sessionId);

  const index = cart.items.findIndex(
    (i) => i.variantSku === itemId || i.productId === itemId
  );

  if (index === -1) {
    throw new APIError(404, 'Cart item not found.');
  }

  if (quantity !== undefined) {
    const item = cart.items[index];
    await validateStock(item.productId, item.variantSku, quantity);
    cart.items[index].quantity = quantity;
  }

  if (giftBoxing !== undefined) {
    cart.items[index].giftBoxing = giftBoxing;
  }

  await saveCart(userId, sessionId, cart);
  return cart;
};

/**
 * Removes an item from the cart.
 */
const deleteCartItem = async (userId, sessionId, itemId) => {
  const cart = await getCart(userId, sessionId);
  cart.items = cart.items.filter(
    (i) => i.variantSku !== itemId && i.productId !== itemId
  );
  await saveCart(userId, sessionId, cart);
  return cart;
};

/**
 * Deletes cart contents.
 */
const clearCart = async (userId, sessionId) => {
  const key = getCartKey(userId, sessionId);
  await redis.del(key);
};

/**
 * Merges guest cart items into the user's logged-in cart.
 */
const mergeCarts = async (userId, sessionId) => {
  if (!userId || !sessionId) return;

  const guestKey = getCartKey(null, sessionId);
  const guestRaw = await redis.get(guestKey);
  if (!guestRaw) return;

  const guestCart = JSON.parse(guestRaw);
  const userCart = await getCart(userId, null);

  for (const guestItem of guestCart.items) {
    const index = userCart.items.findIndex(
      (i) => i.productId === guestItem.productId && i.variantSku === guestItem.variantSku
    );

    if (index > -1) {
      userCart.items[index].quantity += guestItem.quantity;
    } else {
      userCart.items.push(guestItem);
    }
  }

  // Re-verify stocks on merged cart, filtering items that exceed inventory
  const validatedItems = [];
  for (const item of userCart.items) {
    try {
      await validateStock(item.productId, item.variantSku, item.quantity);
      validatedItems.push(item);
    } catch (err) {
      // Skip item
    }
  }
  userCart.items = validatedItems;

  await saveCart(userId, null, userCart);
  await redis.del(guestKey);
};

/**
 * Sync offline cart items.
 * If force=true, client overrides. Otherwise, server wins conflicts.
 */
const syncCart = async (userId, sessionId, offlineItems = [], force = false) => {
  const serverCart = await getCart(userId, sessionId);

  if (force) {
    serverCart.items = offlineItems;
  } else {
    // Server wins conflicts: add client items only if they do not exist on the server
    offlineItems.forEach((clientItem) => {
      const exists = serverCart.items.some(
        (i) => i.productId === clientItem.productId && i.variantSku === clientItem.variantSku
      );
      if (!exists) {
        serverCart.items.push(clientItem);
      }
    });
  }

  // Verify and sanitize inventory bounds
  const validatedItems = [];
  for (const item of serverCart.items) {
    try {
      await validateStock(item.productId, item.variantSku, item.quantity);
      validatedItems.push(item);
    } catch (err) {
      // Discard item if inventory is gone
    }
  }
  serverCart.items = validatedItems;

  await saveCart(userId, sessionId, serverCart);
  return serverCart;
};

module.exports = {
  getCart,
  addItemToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
  mergeCarts,
  syncCart
};
