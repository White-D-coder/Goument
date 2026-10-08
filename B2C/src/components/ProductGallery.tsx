/* eslint-disable @next/next/no-img-element -- Existing local and provider product photography. */
'use client';

import { useId, useState } from 'react';
import ProductPhoto from './ProductPhoto';
import './product-gallery.css';

type GalleryImage = { src: string; alt: string };

export default function ProductGallery({ images, name, contain = false }: {
  images: GalleryImage[];
  name: string;
  contain?: boolean;
}) {
  const [selected, setSelected] = useState(0);
  const imageId = useId();
  const current = images[selected] || images[0];
  if (!current) return null;

  return (
    <div className={`product-gallery${contain ? ' product-gallery-contain' : ''}`}>
      <div className="detail-image">
        <ProductPhoto id={imageId} src={current.src} alt={current.alt} sizes="(max-width: 900px) 100vw, 58vw" priority />
      </div>
      {images.length > 1 && (
        <div className="product-gallery-thumbnails" role="group" aria-label={`${name} photos`}>
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-label={`View ${image.alt}`}
              aria-pressed={selected === index}
              aria-controls={imageId}
              onClick={() => setSelected(index)}
            >
              <img src={image.src} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
