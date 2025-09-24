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

  // Mock ürün verileri
  const mockProducts = [
    {
      id: "1",
      name: "iPhone 15 Pro Max 256GB - Doğal Titanyum",
      price: 67999,
      originalPrice: 69999,
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      reviewCount: 324,
      inStock: true,
      category: "Elektronik",
      url: "/products/iphone-15-pro-max"
    },
    {
      id: "2",
      name: "Samsung Galaxy S24 Ultra 512GB - Phantom Black",
      price: 59999,
      originalPrice: 64999,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      reviewCount: 256,
      inStock: true,
      category: "Elektronik",
      url: "/products/samsung-galaxy-s24-ultra"
    },
    {
      id: "3",
      name: "MacBook Air M3 13\" 256GB - Midnight",
      price: 44999,
      originalPrice: 47999,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      reviewCount: 189,
      inStock: true,
      category: "Elektronik",
      url: "/products/macbook-air-m3"
    },
    {
      id: "4",
      name: "Nike Air Max 270 - Beyaz/Siyah",
      price: 3999,
      originalPrice: 4499,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      reviewCount: 412,
      inStock: true,
      category: "Spor",
      url: "/products/nike-air-max-270"
    },
    {
      id: "5",
      name: "Levi's 501 Original Jeans - Koyu Mavi",
      price: 899,
      originalPrice: 1199,
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.5,
      reviewCount: 578,
      inStock: true,
      category: "Giyim",
      url: "/products/levis-501-jeans"
    },
    {
      id: "6",
      name: "Sony WH-1000XM5 Kablosuz Kulaklık",
      price: 12999,
      originalPrice: 14999,
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.8,
      reviewCount: 234,
      inStock: true,
      category: "Elektronik",
      url: "/products/sony-wh1000xm5"
    },
    {
      id: "7",
      name: "Adidas Ultraboost 22 - Core Black",
      price: 4999,
      originalPrice: 5999,
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.7,
      reviewCount: 189,
      inStock: false,
      category: "Spor",
      url: "/products/adidas-ultraboost-22"
    },
    {
      id: "8",
      name: "Zara Oversize Blazer Ceket - Lacivert",
      price: 1299,
      originalPrice: 1899,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.4,
      reviewCount: 156,
      inStock: true,
      category: "Giyim",
      url: "/products/zara-blazer"
    },
    {
      id: "9",
      name: "Philips Airfryer XXL - 7.3L Kapasiteli",
      price: 3499,
      originalPrice: 3999,
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.6,
      reviewCount: 298,
      inStock: true,
      category: "Ev & Yaşam",
      url: "/products/philips-airfryer"
    },
    {
      id: "10",
      name: "Canon EOS R6 Mark II Body",
      price: 79999,
      originalPrice: 84999,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      rating: 4.9,
      reviewCount: 87,
      inStock: true,
      category: "Elektronik",
      url: "/products/canon-eos-r6"
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

        <ProductList 
          products={mockProducts}
          title="Öne Çıkan Ürünler"
          showFilters={true}
        />
      </div>
    </Layout>
  )
}
