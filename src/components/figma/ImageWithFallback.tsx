import { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
  srcSet?: string;
  sizes?: string;
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

export function ImageWithFallback({
  src,
  alt,
  fallback = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="360" height="640" viewBox="0 0 360 640"><rect width="100%" height="100%" fill="%23f3f4f6"/><rect x="16" y="16" width="328" height="608" rx="20" fill="%23e5e7eb"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-family="Arial, sans-serif" font-size="14">Image not available</text></svg>',
  className = '',
  srcSet,
  sizes,
  fit = 'cover',
  loading = 'lazy',
  onLoad,
  onError,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallback);
      if (onError) onError();
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      srcSet={srcSet}
      sizes={sizes}
      style={{ objectFit: fit }}
      loading={loading}
      decoding="async"
      onLoad={onLoad}
      onError={handleError}
      draggable={false}
    />
  );
}
