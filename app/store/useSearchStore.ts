import { create } from 'zustand';
import { MovieType } from '../services/movies/getMovies';

type State = {
  searchText: string;
  year: string | undefined;
  type: MovieType | undefined;
  setSearchText: (value: string) => void;
  setYear: (value: string) => void;
  setType: (value: MovieType) => void;
  resetStore: () => void;
};

const initialState = {
  searchText: 'The Lord',
  year: undefined,
  type: undefined,
};

export const useSearchStore = create<State>()((set) => ({
  ...initialState,
  setSearchText: (value: string) => set({ searchText: value }),
  setYear: (value: string) => set({ year: value }),
  setType: (value: MovieType) => set({ type: value }),
  resetStore: () => set({ ...initialState }),
}));
