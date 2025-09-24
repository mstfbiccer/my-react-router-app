const Navigation = () => {
  return (
    <nav className="hidden md:flex space-x-8">
      <a href="/" className="text-gray-900 hover:text-blue-600">Ana Sayfa</a>
      <a href="/products" className="text-gray-900 hover:text-blue-600">Ürünler</a>
      <a href="/categories" className="text-gray-900 hover:text-blue-600">Kategoriler</a>
    </nav>
  );
};

export default Navigation;