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
  const [message, setMessage] = useState('');
  const imageId = useId();
  const current = images[selected] || images[0];
  if (!current) return null;

  return (
    <div className={`product-gallery${contain ? ' product-gallery-contain' : ''}${images.length === 1 ? ' product-gallery--single' : ''}`}>
      <div className="detail-image">
        {[...new Set([selected, requested])].map(index => {
          const image = images[index];
          if (!image) return null;
          return <div key={image.src} className="product-gallery-frame" style={{ visibility: index === selected ? 'visible' : 'hidden' }} aria-hidden={index !== selected}>
            <ProductPhoto id={index === selected ? imageId : undefined} src={image.src} alt={image.alt} sizes="(max-width: 640px) 100vw, (max-width: 900px) 85vw, 52vw" priority
              onReady={() => { if (index === requested) { setSelected(index); setMessage(''); } }}
              onUnavailable={() => { if (index === requested) { setRequested(selected); setMessage(index === selected ? 'This photo could not be loaded. Please choose another view.' : 'That photo could not be loaded. Your current photo is still shown.'); } }} />
          </div>;
        })}
      </div>
      <p className={`gallery-status${message ? ' gallery-status--error' : ''}`} role="status" aria-live="polite">{message || (requested !== selected ? 'Loading selected photo…' : '')}</p>
      {images.length > 1 && (
        <div className="product-gallery-thumbnails" role="group" aria-label={`${name} photos`}>
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-label={`View ${image.alt}`}
              title={image.alt}
              aria-pressed={requested === index}
              aria-busy={requested === index && selected !== requested}
              aria-controls={imageId}
              onClick={() => { setMessage(''); setRequested(index); }}
            >
              <span className="product-gallery-thumbnail-photo"><ProductPhoto src={image.src} alt="" sizes="(max-width: 640px) 45vw, 64px" /></span>
              {requested === index && selected !== requested && <span className="gallery-thumbnail-loading" aria-hidden="true" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
