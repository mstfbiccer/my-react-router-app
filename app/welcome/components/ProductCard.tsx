interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  color: 'blue' | 'purple' | 'pink';
  onViewDetails?: () => void;
}

export function ProductCard({ title, description, price, color, onViewDetails }: ProductCardProps) {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 text-blue-600',
    purple: 'from-purple-500 to-purple-600 text-purple-600',
    pink: 'from-pink-500 to-pink-600 text-pink-600'
  };

  const [gradientClass, textColorClass] = colorClasses[color].split(' text-');

  return (
    <div className={`bg-gradient-to-br ${gradientClass} p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-white`}>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="mb-6 opacity-90">{description}</p>
      <div className="text-3xl font-bold mb-2">{price}</div>
      <button 
        onClick={onViewDetails}
        className={`bg-white text-${textColorClass} px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors`}
      >
        View Details
      </button>
    </div>
  );
}
