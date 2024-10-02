import axios from 'axios';

const BASE_URL = 'https://movie-database-alternative.p.rapidapi.com/';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
    'cache-control': 'no-cache',
    'x-rapidapi-host': 'movie-database-alternative.p.rapidapi.com',
    'x-rapidapi-key': process.env.EXPO_PUBLIC_RAPID_API_KEY,
  },
});
