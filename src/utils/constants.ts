export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
export const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

export const IMAGE_SIZES = {
  POSTER_SMALL: 'w185',
  POSTER_MEDIUM: 'w342',
  POSTER_LARGE: 'w500',
  BACKDROP_SMALL: 'w300',
  BACKDROP_MEDIUM: 'w780',
  BACKDROP_LARGE: 'w1280',
  ORIGINAL: 'original',
};

export const API_CONFIG = {
  DEBOUNCE_DELAY: 5000,
  MOVIES_PER_PAGE: 20,
};

export const getImageUrl = (
  path: string | null,
  size: string = 'w500'
): string => {
  if (!path) return '/placeholder-movie.png';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatRuntime = (minutes: number | null): string => {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};