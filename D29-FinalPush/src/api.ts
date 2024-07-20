const BASE_URL = "https://movies-api.nomadcoders.workers.dev";

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface PopularMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface MovieResponse extends PopularMoviesResponse {
  dates: {
    maximum: string;
    minimum: string;
  };
}

export async function getPopular(): Promise<PopularMoviesResponse> {
  return fetch(`${BASE_URL}/popular`).then((r) => r.json());
}

export async function getNowPlaying(): Promise<MovieResponse> {
  return fetch(`${BASE_URL}/now-playing`).then((r) => r.json());
}

export async function getComingSoon(): Promise<MovieResponse> {
  return fetch(`${BASE_URL}/coming-soon`).then((r) => r.json());
}

export async function getMovie(id: string): Promise<string> {
  return fetch(`${BASE_URL}/movie?id=${id}`).then((r) => r.json());
}

export function makeImagePath(image: string) {
  return `https://image.tmdb.org/t/p/w500${image}`;
}

export function makeBgPath(image: string) {
  return `https://image.tmdb.org/t/p/original${image}`;
}
