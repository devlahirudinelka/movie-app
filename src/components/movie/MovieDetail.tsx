import React from 'react';
import type { MovieDetail as MovieDetailType } from '../../types/movie';

import { 
  Star, 
  Clock, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Film 
} from 'lucide-react';
import { getImageUrl } from '../../utils/constants';

interface MovieDetailProps {
  movie: MovieDetailType;
}

export const MovieDetail: React.FC<MovieDetailProps> = ({ movie }) => {
  const backdropUrl = getImageUrl(movie.backdrop_path, 'original');
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatRuntime = (minutes: number | null) => {
    if (!minutes) return 'N/A';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Backdrop Section */}
      <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
        <img
          src={backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-backdrop.png';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 -mt-32 relative z-10 pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-64 md:w-80 rounded-lg shadow-2xl"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-movie.png';
              }}
            />
          </div>

          {/* Details */}
          <div className="flex-1 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {movie.title}
            </h1>
            
            {movie.tagline && (
              <p className="text-gray-400 text-lg italic mb-4">
                "{movie.tagline}"
              </p>
            )}

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center text-yellow-500 mb-2">
                  <Star className="w-5 h-5 mr-2 fill-current" />
                  <span className="font-semibold">Rating</span>
                </div>
                <p className="text-2xl font-bold">
                  {movie.vote_average.toFixed(1)}
                </p>
                <p className="text-sm text-gray-400">
                  {movie.vote_count.toLocaleString()} votes
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center text-blue-500 mb-2">
                  <Clock className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Runtime</span>
                </div>
                <p className="text-2xl font-bold">
                  {formatRuntime(movie.runtime)}
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center text-green-500 mb-2">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Release</span>
                </div>
                <p className="text-xl font-bold">
                  {formatDate(movie.release_date)}
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center text-purple-500 mb-2">
                  <Film className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Status</span>
                </div>
                <p className="text-xl font-bold">
                  {movie.status}
                </p>
              </div>
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-3">Overview</h2>
              <p className="text-gray-300 leading-relaxed">
                {movie.overview || 'No overview available.'}
              </p>
            </div>

            {/* Budget & Revenue */}
            {(movie.budget > 0 || movie.revenue > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {movie.budget > 0 && (
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center text-red-500 mb-2">
                      <DollarSign className="w-5 h-5 mr-2" />
                      <span className="font-semibold">Budget</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {formatCurrency(movie.budget)}
                    </p>
                  </div>
                )}

                {movie.revenue > 0 && (
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center text-green-500 mb-2">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      <span className="font-semibold">Revenue</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {formatCurrency(movie.revenue)}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Additional Info */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Original Language:</span>
                  <span className="ml-2 text-white font-semibold">
                    {movie.original_language.toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Popularity:</span>
                  <span className="ml-2 text-white font-semibold">
                    {movie.popularity.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;