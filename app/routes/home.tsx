import Banner from "~/components/Banner";
import CategoryList from "~/components/CategoryList";
import ProductList from "~/components/ProductList";
import type { Route } from "./+types/home";
import Layout from "~/layouts";
import { useGetCategoriesQuery } from "~/store/api/productsApi";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  // RTK Query ile kategorileri getir
  const { data: apiCategories = [], isLoading, error } = useGetCategoriesQuery();

  // API'den gelen kategori isimlerini CategoryList bileşeninin beklediği formata dönüştür
  const categories = apiCategories.map((categoryName) => ({
    name: categoryName,
    coverImage: getCategoryImage(categoryName),
    url: `/category/${categoryName.toLowerCase()}`
  }));

  // Kategori ismine göre resim döndüren yardımcı fonksiyon
  function getCategoryImage(categoryName: string): string {
    const categoryImages: Record<string, string> = {
      "Electronics": "/elektronik.jpg",
      "Jewelery": "/kozmetik.jpg", 
      "Men's clothing": "/giyim.jpg",
      "Women's clothing": "/giyim.jpg"
    };
    
    return categoryImages[categoryName] || "/elektronik.jpg";
  }

  return (
    <Layout>
      <div className="space-y-0">
        <Banner 
          title="Shop the Latest Fashion Trends"
          image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          url="/"
          size="large"
        />
        
        {isLoading ? (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Popüler Kategoriler</h2>
                <p className="text-gray-600 text-lg">Kategoriler yükleniyor...</p>
              </div>
            </div>
          </section>
        ) : error ? (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Popüler Kategoriler</h2>
                <p className="text-red-600 text-lg">Kategoriler yüklenirken hata oluştu.</p>
              </div>
            </div>
          </section>
        ) : (
          <CategoryList 
            categories={categories}
            title="Popüler Kategoriler"
          />
        )}
        
        {/* Artık ProductList kendi içinde RTK Query ile veri çekiyor */}
        <ProductList 
          title="Öne Çıkan Ürünler"
          showFilters={true}
        />
      </div>
    </Layout>
  )
}
