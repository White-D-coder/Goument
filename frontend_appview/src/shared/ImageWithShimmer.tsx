'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import cloudinaryLoader from './CloudinaryLoader';
import { PackageX } from 'lucide-react';

interface ImageWithShimmerProps extends Omit<ImageProps, 'src' | 'loader' | 'alt'> {
  public_id?: string;
  src?: string;
  alt: string;
}

export const ImageWithShimmer: React.FC<ImageWithShimmerProps> = ({
  public_id,
  src,
  alt,
  className = '',
  priority = false,
  fill,
  width,
  height,
  sizes = '(max-width: 640px) 100vw, 50vw',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const imageSrc = src || public_id || '';

  // Default to fill=true if width and height are omitted
  const isFill = fill ?? (!width && !height);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Shimmer Placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-shimmer bg-[#F4EFE6] z-10" />
      )}

      {/* Error Fallback */}
      {hasError ? (
        <div className="absolute inset-0 bg-[#F5F2EC] flex flex-col items-center justify-center p-3 text-center text-[#6E6259]">
          <PackageX className="w-8 h-8 text-[#D4AF37] mb-1 opacity-70" />
          <span className="text-[11px] font-medium tracking-tight">Image unavailable</span>
        </div>
      ) : (
        <Image
          src={imageSrc}
          alt={alt}
          fill={isFill}
          width={!isFill ? width : undefined}
          height={!isFill ? height : undefined}
          sizes={isFill ? sizes : undefined}
          loader={public_id && !src ? cloudinaryLoader : undefined}
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } object-cover w-full h-full`}
          {...props}
        />
      )}
    </div>
  );
};
