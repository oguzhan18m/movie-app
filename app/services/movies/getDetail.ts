import { axiosInstance } from '../axios';
import { MovieType } from './getMovies';

export interface IMovieRating {
  Source: string;
  Value: string;
}

export interface IMovieDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: IMovieRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: MovieType;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

const getDetail = async (imdbID: string) => {
  try {
    const { data } = await axiosInstance.get('/', {
      params: {
        i: imdbID,
      },
    });

    return data as IMovieDetail;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export default getDetail;
