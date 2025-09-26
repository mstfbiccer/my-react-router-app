import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "~/store/store";
import Layout from "~/layouts";
import CheckoutForm from "~/components/CheckoutForm";
import { useGetProductsQuery } from "~/store/api/productsApi";

export default function OrderPage() {
  const [showForm, setShowForm] = useState(false);
  const basketItems = useSelector((state: RootState) => state.basketOperationsSlice.items);
  const state = useSelector((state: RootState) => state);
  console.log("Global State:", state); // Global state'i konsola yazdır
const { 
    data: products = [], 
    error, 
    isLoading 
  } =  useGetProductsQuery();
  // Sepetteki ürünlerin detaylarını al
  const cartProducts = basketItems.map(basketItem => {
    const product = products.find((p: any) => p.id === basketItem.productId);
    return product ? { ...product, quantity: basketItem.quantity } : null;
  }).filter(Boolean);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  };

  const subtotal = cartProducts.reduce((total, product: any) => total + (product.price * product.quantity), 0);

  return (
    <Layout>
      <div className="min-h-screen flex items-start justify-center p-6 bg-gray-50">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Sipariş Özeti</h1>

          {/* Ürün Özeti */}
          <div className="mb-6">
            {cartProducts.length === 0 ? (
              <div className="text-center text-gray-500">Sepetinizde ürün yok.</div>
            ) : (
              <ul className="divide-y divide-gray-200 mb-4">
                {cartProducts.map((product: any) => (
                  <li key={product.id} className="py-2 flex justify-between items-center">
                    <span className="text-gray-700">{product.name} <span className="text-xs text-gray-400">x{product.quantity}</span></span>
                    <span className="text-gray-900 font-semibold">{formatPrice(product.price * product.quantity)}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-between items-center font-bold text-lg text-gray-900">
              <span>Toplam</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
          </div>

          <div className="mb-6">
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full"
            >
              Siparişi Tamamla
            </button>
          </div>

          {showForm ? (
            <div className="mt-4">
              <CheckoutForm onClose={() => setShowForm(false)} />
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}
