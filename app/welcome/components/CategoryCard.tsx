interface CategoryCardProps {
  id: number;
  title: string;
  description: string;
  color: 'blue' | 'purple' | 'pink';
}

export function CategoryCard({ id, title, description, color }: CategoryCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    pink: 'from-pink-500 to-pink-600'
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100">
      <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[color]} rounded-full mb-6 flex items-center justify-center`}>
        <span className="text-white font-bold text-xl">{id}</span>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
