import { useState, useEffect } from 'react';
import type { Movie } from '../types/movie';
import { tmdbService } from '../services/tmdb';

export const useMovies = (searchQuery?: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = searchQuery 
          ? await tmdbService.searchMovies(searchQuery, page)
          : await tmdbService.getPopularMovies(page);
        
        if (page === 1) {
          setMovies(data.results);
        } else {
          setMovies(prev => [...prev, ...data.results]);
        }
        
        setHasMore(page < data.total_pages);
      } catch (err) {
        setError('Failed to fetch movies. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchQuery, page]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage(prev => prev + 1);
    }
  };

  const resetAndSearch = () => {
    setPage(1);
    setMovies([]);
    setHasMore(true);
  };

  useEffect(() => {
    resetAndSearch();
  }, [searchQuery]);

  return { movies, loading, error, loadMore, hasMore };
};