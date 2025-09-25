import Banner from "~/components/Banner";
import CategoryList from "~/components/CategoryList";
import ProductList from "~/components/ProductList";
import type { Route } from "./+types/home";
import Layout from "~/layouts";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  // Mock kategori verileri
  const mockCategories = [
    {
      name: "Elektronik",
      coverImage: "/elektronik.jpg",
      url: "/categories/elektronik"
    },
    {
      name: "Giyim & Moda",
      coverImage: "/giyim.jpg",
      url: "/categories/giyim"
    },
    {
      name: "Ev & Yaşam",
      coverImage: "/ev-yasam.jpg",
      url: "/categories/ev-yasam"
    },
    {
      name: "Spor & Outdoor",
      coverImage: "/spor.jpg",
      url: "/categories/spor"
    },
    {
      name: "Kitap & Medya",
      coverImage: "/kitap.jpg",
      url: "/categories/kitap"
    },
    {
      name: "Oyuncak & Oyun",
      coverImage: "/oyuncak.jpg",
      url: "/categories/oyuncak"
    },
    {
      name: "Kozmetik & Bakım",
      coverImage: "/kozmetik.jpg",
      url: "/categories/kozmetik"
    },
    {
      name: "Otomotiv",
      coverImage: "/otomotiv.jpg",
      url: "/categories/otomotiv"
    }
  ];

  return (
    <Layout>
      <div className="space-y-0">
        <Banner 
          title="Shop the Latest Fashion Trends"
          image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          url="/"
          size="large"
        />
        
        <CategoryList 
          categories={mockCategories}
          title="Popüler Kategoriler"
        />
        
        {/* Artık ProductList kendi içinde RTK Query ile veri çekiyor */}
        <ProductList 
          title="Öne Çıkan Ürünler"
          showFilters={true}
        />
      </div>
    </Layout>
  )
}
