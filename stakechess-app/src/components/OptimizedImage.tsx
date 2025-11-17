import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  loading?: 'lazy' | 'eager';
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  fallback = '/images/placeholder.png',
  loading = 'lazy'
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(fallback);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Intersection Observer для lazy loading
    if (loading === 'lazy' && imgRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadImage();
              observer.disconnect();
            }
          });
        },
        { rootMargin: '50px' }
      );

      observer.observe(imgRef.current);

      return () => observer.disconnect();
    } else {
      loadImage();
    }
  }, [src]);

  const loadImage = () => {
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };

    img.onerror = () => {
      setHasError(true);
      setIsLoading(false);
      setImageSrc(fallback);
    };
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && (
        <motion.div
          className="absolute inset-0 skeleton"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0.6 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        />
      )}
      
      <motion.img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        loading={loading}
      />

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
          <p className="text-xs text-gray-400">Изображение не загружено</p>
        </div>
      )}
    </div>
  );
}
