import { useReducer, useEffect, createContext, useContext, useCallback, useMemo } from 'react';
import pokemonJSON from 'assets/pokemon.json';

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

const usePokemonSource = (): {
  pokemon: Pokemon[];
  search: string;
  setSearch: (search: string) => void;
} => {
  type PokemonState = {
    pokemon: Pokemon[];
    search: string;
  };

  type PokemonAction = { type: 'SET_POKEMON'; payload: Pokemon[] } | { type: 'SET_SEARCH'; payload: string };

  const [store, dispatch] = useReducer(
    (state: PokemonState, action: PokemonAction) => {
      switch (action.type) {
        case 'SET_POKEMON':
          return { ...state, pokemon: action.payload };
        case 'SET_SEARCH':
          return { ...state, search: action.payload };
      }
    },
    {
      pokemon: [],
      search: '',
    }
  );

  useEffect(() => {
    dispatch({ type: 'SET_POKEMON', payload: pokemonJSON as Pokemon[] });
  }, []);

  const setSearch = useCallback((search: string) => {
    dispatch({
      type: 'SET_SEARCH',
      payload: search,
    });
  }, []);

  const filteredPokemon = useMemo(
    () => store.pokemon.filter((p) => p.name.toLowerCase().includes(store.search.toLowerCase())).slice(0, 20),
    [store.pokemon, store.search]
  );

  const sortedPokemon = useMemo(
    () => [...filteredPokemon].sort((a, b) => a.name.localeCompare(b.name)),
    [filteredPokemon]
  );

  return { pokemon: sortedPokemon, search: store.search, setSearch };
};

const PokemonContext = createContext<ReturnType<typeof usePokemonSource>>({} as ReturnType<typeof usePokemonSource>);

export const usePokemon = (): ReturnType<typeof usePokemonSource> => {
  return useContext(PokemonContext);
};

export const PokemonProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return <PokemonContext.Provider value={usePokemonSource()}>{children}</PokemonContext.Provider>;
};
