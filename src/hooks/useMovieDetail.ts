import { useState, useEffect } from 'react';
import type { MovieDetail } from '../types/movie';
import { tmdbService } from '../services/tmdb';

export const useMovieDetail = (movieId: number) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await tmdbService.getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError('Failed to fetch movie details. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetail();
    }
  }, [movieId]);

  const retry = () => {
    setError(null);
    setLoading(true);
  };

  return { movie, loading, error, retry };
};