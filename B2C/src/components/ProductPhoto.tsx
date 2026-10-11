'use client';

import Image from 'next/image';
import { useState } from 'react';
import './product-photo.css';

type PhotoProps = {
  src: string; alt: string; sizes: string; priority?: boolean; id?: string;
  onReady?: () => void; onUnavailable?: () => void;
};

/** Each source gets its own recovery state, including when a gallery changes photos. */
export default function ProductPhoto(props: PhotoProps) {
  return <Photo key={props.src} {...props} />;
}

function Photo({ src, alt, sizes, priority = false, id, onReady, onUnavailable }: PhotoProps) {
  const [useOriginalAsset, setUseOriginalAsset] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  if (unavailable) return <span id={id} className="product-photo-unavailable" role="img" aria-label={alt ? `Photo unavailable: ${alt}` : 'Photo unavailable'}>
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="m3 17 5-5 4 4 3-3 6 6M8 7h.01" /></svg>
  </span>;

  return <Image id={id} src={src} alt={alt} fill sizes={sizes}
    unoptimized={useOriginalAsset || !src.startsWith('/')} loading={priority ? 'eager' : 'lazy'}
    fetchPriority={priority ? 'high' : 'auto'}
    onLoad={onReady}
    onError={() => {
      if (src.startsWith('/') && !useOriginalAsset) setUseOriginalAsset(true);
      else { setUnavailable(true); onUnavailable?.(); }
    }} />;
}
