export type Product = {
 _id: string; slug: string; name: string; basePrice: number; currency: string;
 description: { short?: string; long?: string }; inventory: number;
 images: { public_id: string; alt?: string }[];
 variants: { sku: string; name: string; price?: number; inventory: number }[];
 categories?: { name: string; slug: string }[];
 preview?: boolean; categoryLabel?: string; giftItemId?: string;
};
export type CartItem = { productId: string; variantSku?: string; quantity: number };
export type User = { id: string; name: string; email: string; role: string };
export const money = (amount: number, currency = 'INR') => new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 2 }).format((typeof amount === 'number' && !Number.isNaN(amount) ? amount : 0) / 100);
export function productImage(product: Product | any) {
 if (!product) return '/images/brand/hero.png';
 const first = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : null;
 const raw = typeof first === 'string' ? first : first?.url || first?.public_id || product.image;
 if (!raw) return '/images/brand/hero.png';
 if (raw.startsWith('/') || raw.startsWith('https://') || raw.startsWith('http://')) return raw;
 const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
 return cloud ? `https://res.cloudinary.com/${encodeURIComponent(cloud)}/image/upload/f_auto,q_auto/${raw}` : '/images/brand/hero.png';
}
