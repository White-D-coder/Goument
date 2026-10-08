import Image from 'next/image';

/** Local photos get responsive sizes; provider URLs retain their existing delivery. */
export default function ProductPhoto({ src, alt, sizes, priority = false, id }: {
  src: string; alt: string; sizes: string; priority?: boolean; id?: string;
}) {
  return <Image id={id} src={src} alt={alt} fill sizes={sizes}
    unoptimized={!src.startsWith('/')} loading={priority ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : 'auto'} />;
}
