import Category from './Category';

interface CategoryData {
  name: string;
  coverImage: string;
  url: string;
}

interface CategoryListProps {
  categories: CategoryData[];
  title?: string;
  className?: string;
}

const CategoryList = ({ categories, title = "Kategoriler", className = '' }: CategoryListProps) => {
  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 text-lg">En popüler kategorilerimizi keşfedin</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Category
              key={index}
              name={category.name}
              coverImage={category.coverImage}
              url={category.url}
              className="w-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryList;