'use client';

import Image from 'next/image';
import { useState } from 'react';

/** Use responsive optimization first, then fall back to the original local asset if it fails. */
export default function ProductPhoto({ src, alt, sizes, priority = false, id }: {
  src: string; alt: string; sizes: string; priority?: boolean; id?: string;
}) {
  const [useOriginalAsset, setUseOriginalAsset] = useState(false);

  return <Image id={id} src={src} alt={alt} fill sizes={sizes}
    unoptimized={useOriginalAsset || !src.startsWith('/')} loading={priority ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : 'auto'}
    onError={() => {
      if (src.startsWith('/') && !useOriginalAsset) setUseOriginalAsset(true);
    }} />;
}
