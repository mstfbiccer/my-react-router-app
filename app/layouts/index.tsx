import Navigation from '../components/layout/Navigation';
import UserActions from '../components/layout/UserActions';
import Logo from '../components/layout/Logo';
import Footer from '../components/layout/Footer';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="app-layout min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />
            <Navigation />
            <UserActions />
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;