import { useParams, Link } from 'react-router-dom';
import { useMovieDetail } from '../hooks/useMovieDetail';
import { Loader } from '../components/common/Loader';
import { ErrorMessage } from '../components/common/ErrorMessage';
import {
   getImageUrl,
   formatDate,
   formatRuntime,
   formatRating,
} from '../utils/constants';
import {
   Star,
   Calendar,
   Clock,
   ArrowLeft,
   Tag,
} from 'lucide-react';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';

export function MovieDetailPage() {
   const { id } = useParams<{ id: string }>();
   const movieId = parseInt(id || '0');
   const { movie, loading, error } = useMovieDetail(movieId);

   if (loading) {
      return <Loader fullScreen />;
   }

   if (error || !movie) {
      return (
         <div className="container mx-auto px-4 py-8">
            <ErrorMessage
               message={error || 'Movie not found'}
               onRetry={() => window.location.reload()}
            />
         </div>
      );
   }

   return (
      <>
         <Header />
         <div className="min-h-screen bg-gray-900 pb-20">
            {/* Backdrop */}
            {movie.backdrop_path && (
               <div className="relative h-96 md:h-[500px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent z-10" />
                  <img
                     src={getImageUrl(movie.backdrop_path, 'w1280')}
                     alt={movie.title}
                     className="w-full h-full object-cover"
                  />
               </div>
            )}

            <div className="container mx-auto px-4 -mt-64 relative z-20">
               <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-white bg-bgfive bg-opacity-50 hover:bg-opacity-70 px-4 py-2 rounded-lg mb-6 transition-all hover:bg-amber-500"
               >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Movies
               </Link>

               <div className="flex flex-col md:flex-row gap-8 lg:mb-12">
                  {/* Poster */}
                  <div className="flex-shrink-0">
                     <img
                        src={getImageUrl(movie.poster_path, 'w500')}
                        alt={movie.title}
                        className="w-full md:w-80 rounded-lg shadow-2xl border-1 border-white/30"
                        onError={(e) => {
                           const target = e.target as HTMLImageElement;
                           target.src = 'https://via.placeholder.com/500x750?text=No+Image';
                        }}
                     />
                  </div>

                  {/* Details */}
                  <div className="flex-1 bg-bgfour rounded-2xl shadow-lg p-6 md:p-8 ring-2 ring-bgfive/40">
                     <h1 className="text-4xl font-bold text-yellow-500 mb-4">
                        {movie.title}
                     </h1>

                     {movie.tagline && (
                        <p className="text-xl text-white italic mb-6">
                           "{movie.tagline}"
                        </p>
                     )}

                     {/* Meta Info */}
                     <div className="flex flex-wrap gap-6 mb-6 text-white">
                        <div className="flex items-center gap-2">
                           <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                           <span className="text-lg font-semibold">
                              {formatRating(movie.vote_average)}/10
                           </span>
                           <span className="text-sm text-gray-500">
                              ({movie.vote_count.toLocaleString()} votes)
                           </span>
                        </div>

                        <div className="flex items-center gap-2">
                           <Calendar className="w-5 h-5 text-blue-600" />
                           <span>{formatDate(movie.release_date)}</span>
                        </div>

                        {movie.runtime && (
                           <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5 text-green-600" />
                              <span>{formatRuntime(movie.runtime)}</span>
                           </div>
                        )}
                     </div>

                     {/* Genres */}
                     {movie.genres && movie.genres.length > 0 && (
                        <div className="mb-6">
                           <div className="flex items-center gap-2 mb-3">
                              <Tag className="w-5 h-5 text-purple-600" />
                              <h3 className="text-lg font-semibold text-white">
                                 Genres
                              </h3>
                           </div>
                           <div className="flex flex-wrap gap-2">
                              {movie.genres.map((genre) => (
                                 <span
                                    key={genre.id}
                                    className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                                 >
                                    {genre.name}
                                 </span>
                              ))}
                           </div>
                        </div>
                     )}

                     {/* Overview */}
                     <div className="mb-6">
                        <h3 className="text-2xl font-semibold text-white/60 mb-3">
                           Overview
                        </h3>
                        <p className="text-white leading-relaxed text-lg">
                           {movie.overview || 'No overview available.'}
                        </p>
                     </div>

                     {/* Additional Info */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                        {movie.status && (
                           <div>
                              <h4 className="font-semibold text-white/50 mb-1">Status</h4>
                              <p className="text-white">{movie.status}</p>
                           </div>
                        )}
                        {movie.original_language && (
                           <div>
                              <h4 className="font-semibold text-white/50 mb-1">
                                 Original Language
                              </h4>
                              <p className="text-white uppercase">
                                 {movie.original_language}
                              </p>
                           </div>
                        )}
                        {movie.budget > 0 && (
                           <div>
                              <h4 className="font-semibold text-white/50 mb-1">Budget</h4>
                              <p className="text-white">
                                 ${movie.budget.toLocaleString()}
                              </p>
                           </div>
                        )}
                        {movie.revenue > 0 && (
                           <div>
                              <h4 className="font-semibold text-white/50 mb-1">Revenue</h4>
                              <p className="text-white">
                                 ${movie.revenue.toLocaleString()}
                              </p>
                           </div>
                        )}
                     </div>

                     {/* Homepage Link */}
                     {movie.homepage && (
                        <div className="mt-6">
                           <a
                              href={movie.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-bgfive transition-colors font-semibold"
                           >
                              Visit Official Website
                           </a>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
         <Footer />
      </>

   );
}