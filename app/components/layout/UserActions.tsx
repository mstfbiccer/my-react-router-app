import { useAuth } from '~/contexts/AuthContext';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import type { RootState } from '~/store/store';

const UserActions = () => {
  const { isLogin, username, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const basketData = useSelector((state: RootState) => state.basketOperationsSlice.items);
  console.log('Basket Items:', basketData);

  return (
    <div className="flex items-center space-x-4">
      <button className="text-gray-900 hover:text-blue-600">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      
      {isLogin ? (
        <div className="flex items-center space-x-3">
          <span className="text-gray-700 text-sm">Hoş geldin, {username}</span>
          <button 
            onClick={handleLogout}
            className="text-gray-900 hover:text-red-600 flex items-center space-x-1"
            title="Çıkış Yap"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="text-sm">Çıkış</span>
          </button>
        </div>
      ) : (
        <Link 
          to="/login" 
          className="text-gray-900 hover:text-blue-600 flex items-center space-x-1"
          title="Giriş Yap"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-sm">Giriş</span>
        </Link>
      )}
      
      <button className="text-gray-900 hover:text-blue-600 relative">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
        </svg>
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {basketData.length}
        </span>
      </button>
    </div>
  );
};

export default UserActions;