import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { SearchBar } from '../components/common/SearchBar';
import { MovieGrid } from '../components/movie/MovieGrid';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useMovies } from '../hooks/useMovies';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const { movies, loading, error, loadMore, hasMore } = useMovies(searchQuery);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const handleSearch = useCallback((newQuery: string) => {
    if (newQuery.trim()) {
      setSearchParams({ q: newQuery });
    } else {
      setSearchParams({});
    }
  }, [setSearchParams]);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
        </div>

        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Search Movies'}
          </h2>
          {movies.length > 0 && (
            <p className="text-gray-400 mt-2">
              Found {movies.length} movie{movies.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

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
    </div>
  );
};

export default SearchPage;