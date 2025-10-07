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

   // Calculate percentage (rating out of 10)
   const ratingPercentage = (movie.vote_average / 10) * 100;
   
   // Determine color based on rating
   const getRatingColor = (rating: number) => {
      if (rating >= 7) return 'text-green-500';
      if (rating >= 5) return 'text-yellow-500';
      return 'text-red-500';
   };
   
   const getProgressColor = (rating: number) => {
      if (rating >= 7) return '#22c55e';
      if (rating >= 5) return '#eab308';
      return '#ef4444';
   };

   return (
      <Link
         to={`/movie/${movie.id}`}
         className="group bg-gray-800 rounded-tl-2xl rounded-2xl rounded-tr-4xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-yellow-500"
      >
         <div className="relative overflow-hidden aspect-[1/1.2]">
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
            <div className="absolute -top-1 -right-1 w-20 h-20">
               <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                     cx="50"
                     cy="50"
                     r="40"
                     fill="black"
                     stroke="#374151"
                     strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                     cx="50"
                     cy="50"
                     r="40"
                     fill="none"
                     stroke={getProgressColor(movie.vote_average)}
                     strokeWidth="8"
                     strokeDasharray={`${2 * Math.PI * 40}`}
                     strokeDashoffset={`${2 * Math.PI * 40 * (1 - ratingPercentage / 100)}`}
                     strokeLinecap="round"
                     className="transition-all duration-500"
                  />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                     <div className={`font-bold text-sm ${getRatingColor(movie.vote_average)}`}>
                        {movie.vote_average.toFixed(1)}
                     </div>
                     <Star className="w-3 h-3 mx-auto fill-current text-yellow-500" />
                  </div>
               </div>
            </div>

            {/* Year Badge */}
            <div className="absolute top-1 left-1 flex items-center text-black text-sm">
               <span className='flex items-center gap-2 bg-yellow-300 px-5 py-2 rounded-full'>
                  <Calendar className="w-4 h-4" />
                  <span>{releaseYear}</span>
               </span>
            </div>
         </div>

         <div className="p-4">
            <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1 group-hover:text-yellow-300 transition-colors">
               {movie.title}
            </h3>

            <p className="text-gray-400 text-sm line-clamp-2 font-light">
               {movie.overview || 'No description available.'}
            </p>
         </div>
      </Link>
   );
};