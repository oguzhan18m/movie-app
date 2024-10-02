import { axiosInstance } from '../axios';

export type MovieType = 'movie' | 'series' | 'episode' | 'game';

export interface IMovieListResponse {
  Response: string;
  Search: IMovieItem[];
  totalResults: string;
  Error?: string;
}

export interface IMovieItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: MovieType;
  Poster: string;
}

const getMovies = async (
  page: number,
  searchText: string,
  year: string | undefined,
  type: string | undefined
): Promise<IMovieListResponse> => {
  try {
    const { data } = await axiosInstance.get('/', {
      params: {
        s: searchText,
        r: 'json',
        page: page,
        y: year,
        type: type,
      },
    });

    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export default getMovies;
