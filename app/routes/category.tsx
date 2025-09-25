import { useParams } from "react-router";
import ProductList from "../components/ProductList";
import Layout from "~/layouts";

export default function Category() {
  const { categoryName } = useParams<{ categoryName: string }>();
  
  if (!categoryName) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Hata</h2>
        <p className="text-gray-600">
          Kategori bulunamadı.
        </p>
      </div>
    );
  }

  return (
    <Layout>
       <div className="container mx-auto px-4 py-8">
        <ProductList 
          title={`${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Ürünleri`}
          category={categoryName}
          showFilters={true}
          className="pt-0"
        />
      </div>
    </Layout>
  );
}