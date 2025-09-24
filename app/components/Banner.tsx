import { useState, useRef, useEffect } from 'react';

interface BannerProps {
  title: string;
  image: string;
  url: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Banner = ({ title, image, url, size = 'medium', className = '' }: BannerProps) => {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const defaultBannerImage = "data:image/svg+xml,%3csvg width='400' height='200' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='400' height='200' fill='%23f3f4f6'/%3e%3cg fill='%236b7280'%3e%3crect x='50' y='50' width='300' height='100' fill='%23e5e7eb' rx='8'/%3e%3ctext x='200' y='110' text-anchor='middle' font-size='18' font-family='Arial' fill='%236b7280'%3eBanner%3c/text%3e%3c/g%3e%3c/svg%3e";

  const sizeClasses = {
    small: 'h-32 sm:h-40',
    medium: 'h-48 sm:h-56 md:h-64',
    large: 'h-64 sm:h-80 md:h-96'
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageError = () => {
    setImgError(true);
  };

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}>
      <a 
        href={url} 
        target="_blank" 
        rel="noreferrer"
        className="block w-full h-full"
        aria-label={title}
      >
        <div className={`relative ${sizeClasses[size]}`}>
          {/* Placeholder while loading */}
          {!isLoaded && (
            <div className={`absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center ${sizeClasses[size]}`}>
              <div className="text-gray-400 text-sm">Yükleniyor...</div>
            </div>
          )}

          <img 
            ref={imgRef}
            src={shouldLoad ? (imgError ? defaultBannerImage : image) : undefined}
            alt={title} 
            className={`w-full object-cover hover:scale-105 transition-transform duration-300 ${sizeClasses[size]} ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-300`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-semibold text-sm sm:text-base truncate">
                {title}
              </h3>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Banner;