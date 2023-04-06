import pokemonJSON from 'assets/pokemon.json';
import { PayloadAction, configureStore, createSelector, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

export const types = [
  'Grass',
  'Poison',
  'Fire',
  'Flying',
  'Water',
  'Bug',
  'Normal',
  'Electric',
  'Ground',
  'Fairy',
  'Fighting',
  'Psychic',
  'Rock',
  'Steel',
  'Ice',
  'Ghost',
  'Dragon',
  'Dark',
];

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
  filters: {
    search: string;
    types: Type[];
  };
}

const initialState: PokemonState = {
  pokemonList: pokemonJSON as Pokemon[],
  filters: {
    search: '',
    types: [] as Type[],
  },
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload.toLocaleLowerCase();
    },
    setType: (state, action: PayloadAction<Type>) => {
      if (state.filters.types.includes(action.payload)) {
        const index = state.filters.types.indexOf(action.payload);
        state.filters.types.splice(index);
      } else {
        state.filters.types.push(action.payload);
      }
    },
  },
});

const { setSearch, setType } = pokemonSlice.actions;

const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

const selectPokemon = createSelector(
  (state: RootState) => state.pokemon.pokemonList,
  (state: RootState) => state.pokemon.filters.search,
  (state: RootState) => state.pokemon.filters.types,
  (pokemonList, search, filterTypes) =>
    pokemonList
      .filter((pokemon) => pokemon.name.toLowerCase().includes(search.toLowerCase()))
      .filter((pokemon) => {
        if (filterTypes.length > 0) {
          return filterTypes.every((filterType) => {
            return pokemon.type.includes(filterType);
          });
        } else {
          return pokemon;
        }
      })
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 12)
);

const selectSearch = (state: RootState): string => {
  return state.pokemon.filters.search;
};

const selectTypes = (state: RootState): Type[] => {
  return state.pokemon.filters.types;
};

export const PokemonProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  return <Provider store={store}>{children}</Provider>;
};

export const usePokemon = (): {
  pokemon: Pokemon[];
  filters: { search: string; types: Type[] };
  setSearch: (search: string) => void;
  setType: (type: Type) => void;
} => {
  const pokemon = useSelector(selectPokemon);
  const search = useSelector(selectSearch);
  const filterTypes = useSelector(selectTypes);

  const dispatch = useDispatch();

  return {
    pokemon,
    filters: { search: search, types: filterTypes },
    setSearch: (s) => dispatch(setSearch(s)),
    setType: (t) => dispatch(setType(t)),
  };
};
