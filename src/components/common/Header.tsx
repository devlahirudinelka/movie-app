import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Home, Search } from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-bgfour border-b border-gray-800 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity group"
          >
            <Film className="w-8 h-8 text-bgfive group-hover:rotate-12 transition-transform" />
            <h1 className="text-2xl font-bold text-white">
              Movie<span className="text-bgfive">Hub</span>
            </h1>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/') 
                  ? 'bg-bgfive text-black font-semibold' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            
            <Link
              to="/search"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/search') 
                  ? 'bg-bgfive text-black font-semibold' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Search className="w-5 h-5" />
              <span className="hidden sm:inline">Search</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;