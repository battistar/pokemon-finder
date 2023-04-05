import pokemonJSON from 'assets/pokemon.json';
import { PayloadAction, configureStore, createSelector, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

export type Type =
  | 'Grass'
  | 'Poison'
  | 'Fire'
  | 'Flying'
  | 'Water'
  | 'Bug'
  | 'Normal'
  | 'Electric'
  | 'Ground'
  | 'Fairy'
  | 'Fighting'
  | 'Psychic'
  | 'Rock'
  | 'Steel'
  | 'Ice'
  | 'Ghost'
  | 'Dragon'
  | 'Dark';

export interface Pokemon {
  id: number;
  name: string;
  type: Type[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

interface PokemonState {
  pokemonList: Pokemon[];
  search: string;
}

const initialState: PokemonState = {
  pokemonList: pokemonJSON as Pokemon[],
  search: '',
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload.toLocaleLowerCase();
    },
  },
});

const { setSearch } = pokemonSlice.actions;

const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

const selectPokemon = createSelector(
  (state: RootState) => state.pokemon.pokemonList,
  (state: RootState) => state.pokemon.search,
  (pokemonList, search) =>
    pokemonList
      .filter((pokemon) => pokemon.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 12)
);

const selectSearch = (state: RootState): string => {
  return state.pokemon.search;
};

export const PokemonProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  return <Provider store={store}>{children}</Provider>;
};

export const usePokemon = (): { pokemon: Pokemon[]; search: string; setSearch: (search: string) => void } => {
  const pokemon = useSelector(selectPokemon);
  const search = useSelector(selectSearch);

  const dispatch = useDispatch();

  return { pokemon, search, setSearch: (s) => dispatch(setSearch(s)) };
};
