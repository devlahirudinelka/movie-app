import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { MovieGrid } from '../components/movie/MovieGrid';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useMovies } from '../hooks/useMovies';

export const HomePage: React.FC = () => {
  const { movies, loading, error, loadMore, hasMore } = useMovies();

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="mb-8 flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Popular Movies
          </h1>
          <p className="text-gray-400 text-[0.8rem] lg:text-lg font-light">
            Discover the most popular movies right now
          </p>
        </div>

        {/* Movie Count */}
        {movies.length > 0 && !loading && (
          <div className="mb-6">
            <p className="text-gray-400">
              Showing {movies.length} movie{movies.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Content */}
        {error ? (
          <ErrorMessage message={error} onRetry={() => window.location.reload()} />
        ) : (
          <MovieGrid 
            movies={movies} 
            loading={loading} 
            onLoadMore={loadMore}
            hasMore={hasMore}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;