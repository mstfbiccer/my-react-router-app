import { useState, useRef, useEffect } from 'react';

interface CategoryProps {
  name: string;
  coverImage: string;
  url: string;
  className?: string;
}

const Category = ({ name, coverImage, url, className = '' }: CategoryProps) => {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Default fallback image for broken category images
  const defaultCategoryImage = "data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100' height='100' fill='%23f3f4f6'/%3e%3cg fill='%236b7280'%3e%3cpath d='M25 30h50v40H25z' fill='%23e5e7eb'/%3e%3cpath d='M35 45h30v2H35zm0 5h25v2H35zm0 5h20v2H35z'/%3e%3ctext x='50' y='20' text-anchor='middle' font-size='12' font-family='Arial' fill='%236b7280'%3eKategori%3c/text%3e%3c/g%3e%3c/svg%3e";

  // Lazy loading with Intersection Observer
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
    <div className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
      <a 
        href={url} 
        className="block w-full h-full"
        aria-label={name}
      >
        <div className="relative h-48 overflow-hidden">
          {/* Placeholder while loading */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="text-gray-400 text-sm">Yükleniyor...</div>
            </div>
          )}
          
          <img 
            ref={imgRef}
            src={shouldLoad ? (imgError ? defaultCategoryImage : coverImage) : undefined}
            alt={name} 
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-300`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-lg mb-1 group-hover:text-yellow-300 transition-colors duration-300">
            {name}
          </h3>
          <div className="flex items-center text-white/80 text-sm group-hover:text-white transition-colors duration-300">
            <span>Kategoriyi Keşfet</span>
            <svg 
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Category;