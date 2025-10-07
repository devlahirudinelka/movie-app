import React from 'react';
import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bgfour border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <Film className="w-6 h-6 text-bgfive group-hover:rotate-12 transition-transform" />
            <span className="text-white font-semibold">
              Movie<span className="text-bgfive">Hub</span>
            </span>
          </Link>

          {/* Copyright */}
          <p className="text-gray-500 text-sm flex items-center gap-2">
            © {currentYear} MovieHub • Made with{' '}
          <strong>devlahirudinelka</strong>.
          </p>

          
        </div>
      </div>
    </footer>
  );
};

export default Footer;