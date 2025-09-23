import { CategoryCard } from './components/CategoryCard';
import { ProductCard } from './components/ProductCard';
import { categories, products } from './data/welcomeData';

export function Welcome() {
  const handleViewDetails = (productTitle: string) => {
    console.log(`View details for: ${productTitle}`);
    // Handle navigation or modal opening logic here
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
        Welcome to Our Store
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-6xl">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            id={category.id}
            title={category.title}
            description={category.description}
            color={category.color}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
        {products.map((product) => (
          <ProductCard
            key={product.title}
            title={product.title}
            description={product.description}
            price={product.price}
            color={product.color}
            onViewDetails={() => handleViewDetails(product.title)}
          />
        ))}
      </div>
    </div>    
  );
}
