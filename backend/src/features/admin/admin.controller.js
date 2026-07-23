const redis = require('../../shared/utils/redis');
const Order = require('../order/order.model');

const getAdminStats = async (req, res, next) => {
  try {
    // 1. Fetch completed orders count and gross revenue in paise
    const orderStats = await Order.aggregate([
      {
        $match: {
          status: { $in: ['confirmed', 'processing', 'shipped', 'delivered'] }
        }
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$total' }
        }
      }
    ]);

    const totalOrdersCount = await Order.countDocuments();
    const revenue = orderStats.length > 0 ? orderStats[0].totalRevenue : 0;
    const completedOrdersCount = orderStats.length > 0 ? orderStats[0].totalOrders : 0;

    // 2. Fetch rough count of active sessions/carts from Redis
    let activeCarts = 0;
    if (process.env.NODE_ENV !== 'test') {
      const guestKeys = await redis.keys('cart:guest:*');
      const userKeys = await redis.keys('cart:user:*');
      activeCarts = guestKeys.length + userKeys.length;
    }

    // 3. Aggregate top 5 products by quantity sold
    const topProducts = await Order.aggregate([
      {
        $match: {
          status: { $in: ['confirmed', 'processing', 'shipped', 'delivered'] }
        }
      },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          quantitySold: { $sum: '$items.quantity' },
          revenueGenerated: { $sum: '$items.totalPrice' }
        }
      },
      { $sort: { quantitySold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'details'
        }
      },
      { $unwind: '$details' },
      {
        $project: {
          productId: '$_id',
          name: '$details.name',
          quantitySold: 1,
          revenueGenerated: 1
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalOrders: totalOrdersCount,
        completedOrders: completedOrdersCount,
        revenue,
        activeCarts,
        topProducts
      }
    });
  } catch (error) {
    return next(error);
  }
};

const getAdminOrders = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) {
      query.status = status;
    }

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit, 10))
      .populate('user', 'name email');

    const total = await Order.countDocuments(query);

    return res.status(200).json({
      success: true,
      data: orders,
      total,
      page: parseInt(page, 10),
      pages: Math.ceil(total / parseInt(limit, 10))
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAdminStats,
  getAdminOrders
};
