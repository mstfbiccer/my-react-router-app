import { Link } from 'react-router';

const Logo = () => {
  return (
    <div className="flex-shrink-0">
      <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
        E-Shop
      </Link>
    </div>
  );
};

export default Logo;