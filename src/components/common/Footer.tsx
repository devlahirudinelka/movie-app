import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <Film className="w-6 h-6 text-yellow-500 group-hover:rotate-12 transition-transform" />
            <span className="text-white font-semibold">
              Movie<span className="text-yellow-500">Browser</span>
            </span>
          </Link>

          {/* Copyright */}
          <p className="text-gray-500 text-sm flex items-center gap-2">
            © {currentYear} MovieBrowser • Made with{' '}
            <Heart className="w-4 h-4 text-red-500 fill-current" />
          </p>

          {/* TMDb Link */}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-500 transition-colors text-sm flex items-center gap-1"
          >
            Powered by TMDb
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;