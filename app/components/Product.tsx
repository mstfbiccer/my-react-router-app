import { useState, useRef, useEffect } from 'react';
import Lightbox from './Lightbox';
import { useAuth } from '~/contexts/AuthContext';
import { Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { addItem } from '~/store/slices/basketOperations';

interface ProductProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  category: string;
  url: string;
  className?: string;
}

const Product = ({ 
  id, 
  name, 
  price, 
  originalPrice, 
  image, 
  rating, 
  reviewCount, 
  inStock, 
  category, 
  url, 
  className = '' 
}: ProductProps) => {
  const [imgError, setImgError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const {isLogin} = useAuth();
  // Default fallback image for broken product images
  const defaultProductImage = "data:image/svg+xml,%3csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='200' height='200' fill='%23f3f4f6'/%3e%3cg fill='%236b7280'%3e%3crect x='50' y='60' width='100' height='80' fill='%23e5e7eb' rx='8'/%3e%3cpath d='M80 85h40v2H80zm0 10h35v2H80zm0 10h30v2H80z'/%3e%3ctext x='100' y='40' text-anchor='middle' font-size='14' font-family='Arial' fill='%236b7280'%3eÜrün%3c/text%3e%3c/g%3e%3c/svg%3e";
  const dispatch = useDispatch();
  
  // Generate product detail route from product ID
  const productDetailRoute = `/product/${id}`;

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inStock) {
      setQuantity(prev => prev + 1);
      dispatch(addItem({ productId: id, quantity: 1}));
    }
  };

  const handleIncreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inStock) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    if (quantity > 0) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleViewImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLightboxOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" clipPath="polygon(0 0, 50% 0, 50% 100%, 0 100%)" />
        </svg>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 fill-gray-300" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }

    return stars;
  };

  return (
    <>
      <div className={`group relative bg-white dark:bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
        <div className="relative">
          <Link to={productDetailRoute} className="block">
            <div className="relative h-48 overflow-hidden rounded-t-xl">
              {/* Placeholder while loading */}
              {!isLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="text-gray-400 text-sm">Yükleniyor...</div>
                </div>
              )}
              
              <img 
                ref={imgRef}
                src={shouldLoad ? (imgError ? defaultProductImage : image) : undefined}
                alt={name} 
                className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                  isLoaded ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-300`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                loading="lazy"
              />
              
              {/* Stock durumu */}
              {!inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Tükendi
                  </span>
                </div>
              )}
              {/* İndirim oranı */}
              {originalPrice && originalPrice > price && (
                <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  %{Math.round((1 - price / originalPrice) * 100)} İndirim
                </div>
              )}
            </div>
          </Link>
          <div className="p-4">
            {/* Kategori */}
            <span className="text-xs text-gray-500 dark:text-gray-600 uppercase tracking-wide">{category}</span>
            
            {/* Ürün adı */}
            <Link to={productDetailRoute} className="block">
              <h3 className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                {name}
              </h3>
            </Link>
            {/* Rating */}
            <div className="mt-2 flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {renderStars(rating)}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-600">({reviewCount})</span>
            </div>
            {/* Fiyat */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900 dark:text-gray-900">
                  {formatPrice(price)}
                </span>
                {originalPrice && originalPrice > price && (
                  <span className="text-sm text-gray-500 dark:text-gray-600 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                )}
              </div>
            </div>
            {/* Aksiyonlar */}
              {
                isLogin ? (
                  <div className="mt-4 flex items-center justify-between">
                  {quantity === 0 ? (
                    <button
                      onClick={handleAddToCart}
                      disabled={!inStock}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                        inStock 
                          ? 'bg-blue-600 text-white hover:bg-blue-700' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {inStock ? 'Sepete Ekle' : 'Tükendi'}
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2 flex-1">
                      <button
                        onClick={handleDecreaseQuantity}
                        className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <span className="font-semibold text-gray-900 dark:text-gray-900">{quantity}</span>
                      <button
                        onClick={handleIncreaseQuantity}
                        className="w-8 h-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>
                  )}
                  
                  <button
                    onClick={handleViewImage}
                    className="ml-2 p-2 rounded-lg border border-gray-300 hover:border-blue-600 hover:text-blue-600 text-gray-600 dark:text-gray-700 transition-colors duration-200"
                    title="Resmi Büyüt"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
                ) : (
                  <div className="mt-4">
                    <Link to="/login" className="block w-full py-2 px-4 rounded-lg text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 text-center">
                      Giriş Yap & Sepete Ekle
                    </Link>
                  </div>
                )
              }
          </div>
        </div>
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        imageSrc={imgError ? defaultProductImage : image}
        imageAlt={name}
        productName={name}
      />
    </>
  );
};

export default Product;