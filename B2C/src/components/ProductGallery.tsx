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
  const [requested, setRequested] = useState(0);
  const imageId = useId();
  const current = images[selected] || images[0];
  if (!current) return null;

  return (
    <div className={`product-gallery${contain ? ' product-gallery-contain' : ''}`}>
      <div className="detail-image">
        {[...new Set([selected, requested])].map(index => {
          const image = images[index];
          if (!image) return null;
          return <div key={image.src} className="product-gallery-frame" style={{ visibility: index === selected ? 'visible' : 'hidden' }} aria-hidden={index !== selected}>
            <ProductPhoto id={index === selected ? imageId : undefined} src={image.src} alt={image.alt} sizes="(max-width: 900px) 100vw, 58vw" priority
              onReady={() => { if (index === requested) setSelected(index); }}
              onUnavailable={() => { if (index === requested) setRequested(selected); }} />
          </div>;
        })}
      </div>
      {images.length > 0 && (
        <div className={`product-gallery-thumbnails${images.length === 1 ? ' product-gallery-thumbnails--single' : ''}`} role="group" aria-label={`${name} photos`}>
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-label={`View ${image.alt}`}
              aria-pressed={requested === index}
              aria-busy={requested === index && selected !== requested}
              aria-controls={imageId}
              onClick={() => setRequested(index)}
            >
              <span className="product-gallery-thumbnail-photo"><ProductPhoto src={image.src} alt="" sizes="(max-width: 640px) 150px, 72px" /></span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
