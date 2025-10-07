import React from 'react';
import { Link } from 'react-router-dom';

import { Star, Calendar } from 'lucide-react';
import type { Movie } from '../../types/movie';
import { getImageUrl } from '../../utils/constants';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const posterUrl = getImageUrl(movie.poster_path, 'w342');
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <Link 
      to={`/movie/${movie.id}`}
      className="group bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 "
    >
      <div className="relative overflow-hidden aspect-[2/3]">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-movie.png';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full flex items-center gap-1 font-bold text-sm">
          <Star className="w-4 h-4 fill-current" />
          {movie.vote_average.toFixed(1)}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1 group-hover:text-yellow-500 transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center text-gray-400 text-sm mb-2">
          <Calendar className="w-4 h-4 mr-1" />
          {releaseYear}
        </div>

        <p className="text-gray-400 text-sm line-clamp-2">
          {movie.overview || 'No description available.'}
        </p>
      </div>
    </Link>
  );
};