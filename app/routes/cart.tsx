import { Link } from "react-router";
import { useState } from "react";
import Layout from "~/layouts";
import { useAuth } from "~/contexts/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, decreaseQuantity, increaseQuantity, clearBasket } from "~/store/slices/basketOperations";
import { useGetProductsQuery } from "~/store/api/productsApi";
import type { RootState } from "~/store/store";
import type { Route } from "./+types/cart";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Sepetim - E-Shop` },
    { name: "description", content: "Alışveriş sepetinizi görüntüleyin ve yönetin" },
  ];
}

export default function Cart() {
  const { isLogin } = useAuth();
  const dispatch = useDispatch();
  const basketItems = useSelector((state: RootState) => state.basketOperationsSlice.items);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  // RTK Query ile tüm ürünleri getir (sepetteki ürün detayları için)
  const { data: allProducts = [], isLoading: productsLoading } = useGetProductsQuery();

  // Sepetteki ürünlerin detaylarını al
  const cartProducts = basketItems.map(basketItem => {
    const product = allProducts.find(p => p.id === basketItem.productId);
    return {
      ...product,
      quantity: basketItem.quantity
    };
  }).filter(item => item.id); // Sadece bulunan ürünleri dahil et

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  };

  const calculateSubtotal = () => {
    return cartProducts.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
  };

  const calculateShipping = (subtotal: number) => {
    return subtotal >= 150 ? 0 : 15; // 150₺ üzeri ücretsiz kargo
  };

  const subtotal = calculateSubtotal();
  const shipping = calculateShipping(subtotal);
  const total = subtotal + shipping;

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleDecreaseQuantity = (productId: string) => {
    dispatch(decreaseQuantity({ productId }));
  };

  const handleIncreaseQuantity = (productId: string) => {
    dispatch(increaseQuantity({ productId }));
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeItem({ productId }));
  };

  const handleClearBasket = () => {
    dispatch(clearBasket());
    setShowClearConfirm(false);
  };

  if (!isLogin) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-blue-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Sepeti görüntülemek için giriş yapın</h3>
            <p className="text-gray-500 mb-6">Sepetinizi görüntülemek ve yönetmek için hesabınıza giriş yapmanız gerekiyor.</p>
            <Link 
              to="/login" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Giriş Yap
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (productsLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Sepetim</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 h-fit animate-pulse">
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (basketItems.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Sepetiniz boş</h3>
            <p className="text-gray-500 mb-6">Alışverişe başlamak için ürünlere göz atın.</p>
            <Link 
              to="/" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Alışverişe Başla
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sepetim ({basketItems.length} ürün)</h1>
          {basketItems.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Sepeti Temizle</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <Link to={`/product/${product.id}`} className="flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg hover:scale-105 transition-transform duration-200"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link 
                        to={`/product/${product.id}`}
                        className="text-lg font-medium text-gray-900 hover:text-blue-600 truncate block"
                      >
                        {product.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                      <div className="flex items-center mt-2 space-x-4">
                        <span className="text-lg font-bold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleDecreaseQuantity(product.id)}
                        className="w-8 h-8 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      
                      <input
                        type="number"
                        min="1"
                        value={product.quantity}
                        onChange={(e) => handleUpdateQuantity(product.id, parseInt(e.target.value) || 1)}
                        className="w-16 text-center border border-gray-300 rounded-md py-1 px-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      
                      <button
                        onClick={() => handleIncreaseQuantity(product.id)}
                        className="w-8 h-8 rounded-full border border-gray-300 hover:border-gray-400 flex items-center justify-center transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(product.id)}
                      className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
                      title="Ürünü Kaldır"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {/* Product Total */}
                  <div className="mt-4 flex justify-end">
                    <span className="text-lg font-semibold text-gray-900">
                      Toplam: {formatPrice(product.price * product.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sipariş Özeti</h2>
            
            <div className="space-y-3 border-b border-gray-200 pb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Ara Toplam</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Kargo</span>
                <span className="font-medium">
                  {shipping === 0 ? 'Ücretsiz' : formatPrice(shipping)}
                </span>
              </div>
              {subtotal < 150 && (
                <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                  {formatPrice(150 - subtotal)} daha alışveriş yapın, kargo ücretsiz olsun!
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-4 text-lg font-bold">
              <span>Toplam</span>
              <span>{formatPrice(total)}</span>
            </div>

            <Link to={"/orders"} className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200">
              Siparişi Tamamla
            </Link>

            <Link 
              to="/"
              className="block w-full mt-3 text-center py-3 px-4 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Alışverişe Devam Et
            </Link>

            {/* Security Features */}
            <div className="mt-6 space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Güvenli ödeme</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>14 gün ücretsiz iade</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Hızlı teslimat</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clear Cart Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sepeti Temizle</h3>
            <p className="text-gray-600 mb-6">Sepetinizdeki tüm ürünler kaldırılacak. Bu işlem geri alınamaz.</p>
            <div className="flex space-x-3">
              <button
                onClick={handleClearBasket}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
              >
                Sepeti Temizle
              </button>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-200"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}