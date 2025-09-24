const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">E-Shop</h3>
            <p className="text-gray-300">En kaliteli ürünlerle hizmetinizdeyiz.</p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Hızlı Linkler</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-white">Ana Sayfa</a></li>
              <li><a href="/products" className="hover:text-white">Ürünler</a></li>
              <li><a href="/about" className="hover:text-white">Hakkımızda</a></li>
              <li><a href="/contact" className="hover:text-white">İletişim</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">İletişim</h4>
            <p className="text-gray-300">Email: info@eshop.com</p>
            <p className="text-gray-300">Tel: (0212) 123 45 67</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 E-Shop. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;