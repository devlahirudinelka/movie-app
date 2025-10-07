import React from 'react';

import { MovieCard } from './MovieCard';
import { Loader } from '../common/Loader';
import type { Movie } from '../../types/movie';

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  loading = false,
  onLoadMore,
  hasMore = false
}) => {
  if (!loading && movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-400 text-xl mb-4">No movies found</p>
        <p className="text-gray-500">Try adjusting your search</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <Loader />
        </div>
      )}

      {!loading && hasMore && onLoadMore && (
        <div className="flex justify-center py-12">
          <button
            onClick={onLoadMore}
            className="bg-bgfive hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default MovieGrid;