export type EnvelopePack = 10 | 20;
export const isEnvelopeGift = (id: string) => /^preview-envelope-ep[1-9](?:-pack-10)?$/.test(id);
export const envelopePack = (id: string): EnvelopePack => id.endsWith('-pack-10') ? 10 : 20;
export const envelopePackId = (id: string, size: EnvelopePack) => id.replace(/-pack-10$/, '') + (size === 10 ? '-pack-10' : '');
export const envelopePackPrice = (size: EnvelopePack) => size === 10 ? 149900 : 249900;

export function productEnvelopePackPrice(product: { variants: { name: string; price?: number }[] }, size: EnvelopePack) {
  const price = product.variants.find(variant => variant.name === `Pack of ${size}`)?.price;
  return Number.isSafeInteger(price) && (price ?? 0) > 0 ? price! : envelopePackPrice(size);
}
