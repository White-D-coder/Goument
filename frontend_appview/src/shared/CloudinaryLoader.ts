export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width?: number;
  quality?: number;
}) {
  // If complete external HTTP URL is passed (or local static image), return directly
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')) {
    return src;
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'gourmet-gem';
  const params = ['f_auto', 'q_auto'];
  if (width) params.push(`w_${width}`);
  if (quality) params.push(`q_${quality}`);

  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(',')}/${src}`;
}
