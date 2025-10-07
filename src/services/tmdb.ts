// src/services/tmdb.ts

import axios, { type AxiosInstance } from 'axios';
import type { MoviesResponse, MovieDetail } from '../types/movie';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../utils/constants';

class TMDbService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: TMDB_BASE_URL,
      params: {
        api_key: TMDB_API_KEY,
      },
    });
  }

  async getPopularMovies(page: number = 1): Promise<MoviesResponse> {
    const response = await this.api.get<MoviesResponse>('/movie/popular', {
      params: { page },
    });
    return response.data;
  }

  async searchMovies(query: string, page: number = 1): Promise<MoviesResponse> {
    const response = await this.api.get<MoviesResponse>('/search/movie', {
      params: { query, page },
    });
    return response.data;
  }

  async getMovieDetails(movieId: number): Promise<MovieDetail> {
    const response = await this.api.get<MovieDetail>(`/movie/${movieId}`);
    return response.data;
  }

  async getMovieCredits(movieId: number) {
    const response = await this.api.get(`/movie/${movieId}/credits`);
    return response.data;
  }

  async getSimilarMovies(movieId: number): Promise<MoviesResponse> {
    const response = await this.api.get<MoviesResponse>(
      `/movie/${movieId}/similar`
    );
    return response.data;
  }
}

export const tmdbService = new TMDbService();