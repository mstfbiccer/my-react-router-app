import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface FakeStoreProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  category: string;
  url: string;
}

// Fake Store API'den gelen veriyi uygulamamıza uygun formata dönüştürme
const transformFakeStoreProduct = (product: FakeStoreProduct): Product => {
  return {
    id: product.id.toString(),
    name: product.title,
    price: product.price,
    description: product.description,
    originalPrice: Math.random() > 0.5 ? product.price * 1.2 : undefined, // Rastgele indirim
    image: product.image,
    rating: product.rating.rate,
    reviewCount: product.rating.count,
    inStock: Math.random() > 0.1, // %90 stokta
    category: product.category.charAt(0).toUpperCase() + product.category.slice(1),
    url: `/product/${product.id}`
  };
};

// RTK Query API tanımı middleware
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com/',
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => ({
        url: 'products',
        method: 'GET',
      }),
      transformResponse: (response: FakeStoreProduct[]) =>
        response.map(transformFakeStoreProduct),
      providesTags: ['Product'],
    }),
    getProduct: builder.query<Product, string>({
      query: (id) => `products/${id}`,
      transformResponse: (response: FakeStoreProduct) =>
        transformFakeStoreProduct(response),
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    getProductsByCategory: builder.query<Product[], string>({
      query: (category) => `products/category/${category}`,
      transformResponse: (response: FakeStoreProduct[]) =>
        response.map(transformFakeStoreProduct),
      providesTags: ['Product'],
    }),
    getCategories: builder.query<string[], void>({
      query: () => 'products/categories',
      transformResponse: (response: string[]) =>
        response.map(category => category.charAt(0).toUpperCase() + category.slice(1)),
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetProductsByCategoryQuery,
  useGetCategoriesQuery,
} = productsApi