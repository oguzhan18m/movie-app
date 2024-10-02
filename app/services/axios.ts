import axios from 'axios';

const BASE_URL = 'https://movie-database-alternative.p.rapidapi.com/';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
    'cache-control': 'no-cache',
    'x-rapidapi-host': 'movie-database-alternative.p.rapidapi.com',
    'x-rapidapi-key': '7818025b5cmsh5715e29ad3c4c5cp1a1b8bjsn09b529a17124',
  },
});
