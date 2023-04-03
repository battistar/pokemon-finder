import pokemonJSON from 'assets/pokemon.json';
import { PayloadAction, configureStore, createSlice } from '@reduxjs/toolkit';
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
  filteredPokemonList: Pokemon[];
  search: string;
}

const initialState: PokemonState = {
  pokemonList: pokemonJSON as Pokemon[],
  filteredPokemonList: pokemonJSON as Pokemon[],
  search: '',
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload.toLocaleLowerCase();
      state.filteredPokemonList = state.pokemonList
        .filter((p) => p.name.toLowerCase().includes(action.payload.toLowerCase()))
        .slice(0, 20)
        .sort((a, b) => a.id - b.id);
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

export const PokemonProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  return <Provider store={store}>{children}</Provider>;
};

export const usePokemon = (): { pokemon: Pokemon[]; search: string; setSearch: (search: string) => void } => {
  const pokemon = useSelector((state: RootState) => state.pokemon.filteredPokemonList);
  const search = useSelector((state: RootState) => state.pokemon.search);

  const dispatch = useDispatch();

  return { pokemon, search, setSearch: (s) => dispatch(setSearch(s)) };
};
