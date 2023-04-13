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

export const attributes = {
  hp: { min: 1, max: 255 },
  attack: { min: 5, max: 181 },
  defense: { min: 5, max: 230 },
  specialAttack: { min: 10, max: 173 },
  specialDefense: { min: 20, max: 230 },
  speed: { min: 5, max: 160 },
};

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
    hp: [number, number];
    attack: [number, number];
    defense: [number, number];
    specialAttack: [number, number];
    specialDefense: [number, number];
    speed: [number, number];
  };
}

const initialState: PokemonState = {
  pokemonList: pokemonJSON as Pokemon[],
  filters: {
    search: '',
    types: [] as Type[],
    hp: [attributes.hp.min, attributes.hp.max],
    attack: [attributes.attack.min, attributes.attack.max],
    defense: [attributes.defense.min, attributes.defense.max],
    specialAttack: [attributes.specialAttack.min, attributes.specialAttack.max],
    specialDefense: [attributes.specialDefense.min, attributes.specialDefense.max],
    speed: [attributes.speed.min, attributes.speed.max],
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
    setHP: (state, action: PayloadAction<[number, number]>) => {
      state.filters.hp = action.payload;
    },
    setAttack: (state, action: PayloadAction<[number, number]>) => {
      state.filters.attack = action.payload;
    },
    setDefense: (state, action: PayloadAction<[number, number]>) => {
      state.filters.defense = action.payload;
    },
    setSpecialAttack: (state, action: PayloadAction<[number, number]>) => {
      state.filters.specialAttack = action.payload;
    },
    setSpecialDefense: (state, action: PayloadAction<[number, number]>) => {
      state.filters.specialDefense = action.payload;
    },
    setSpeed: (state, action: PayloadAction<[number, number]>) => {
      state.filters.speed = action.payload;
    },
  },
});

const { setSearch, setType, setHP, setAttack, setDefense, setSpecialAttack, setSpecialDefense, setSpeed } =
  pokemonSlice.actions;

const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

const selectPokemon = createSelector(
  (state: RootState) => state.pokemon.pokemonList,
  (state: RootState) => state.pokemon.filters,
  (pokemonList, filters) =>
    pokemonList
      .filter((pokemon) => pokemon.name.toLowerCase().includes(filters.search.toLowerCase()))
      .filter((pokemon) => {
        if (filters.types.length > 0) {
          return filters.types.every((type) => {
            return pokemon.type.includes(type);
          });
        } else {
          return pokemon;
        }
      })
      .filter((pokemon) => {
        return pokemon.hp >= filters.hp[0] && pokemon.hp <= filters.hp[1];
      })
      .filter((pokemon) => {
        return pokemon.attack >= filters.attack[0] && pokemon.attack <= filters.attack[1];
      })
      .filter((pokemon) => {
        return pokemon.defense >= filters.defense[0] && pokemon.defense <= filters.defense[1];
      })
      .filter((pokemon) => {
        return pokemon.special_attack >= filters.specialAttack[0] && pokemon.special_attack <= filters.specialAttack[1];
      })
      .filter((pokemon) => {
        return (
          pokemon.special_defense >= filters.specialDefense[0] && pokemon.special_defense <= filters.specialDefense[1]
        );
      })
      .filter((pokemon) => {
        return pokemon.speed >= filters.speed[0] && pokemon.speed <= filters.speed[1];
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

const selectHP = (state: RootState): [number, number] => {
  return state.pokemon.filters.hp;
};

const selectAttack = (state: RootState): [number, number] => {
  return state.pokemon.filters.attack;
};

const selectDefense = (state: RootState): [number, number] => {
  return state.pokemon.filters.defense;
};

const selectSpecialAttack = (state: RootState): [number, number] => {
  return state.pokemon.filters.specialAttack;
};

const selectSpecialDefense = (state: RootState): [number, number] => {
  return state.pokemon.filters.specialDefense;
};

const selectSpeed = (state: RootState): [number, number] => {
  return state.pokemon.filters.speed;
};

export const PokemonProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  return <Provider store={store}>{children}</Provider>;
};

export const usePokemon = (): {
  pokemon: Pokemon[];
  filters: {
    search: string;
    types: Type[];
    hp: [number, number];
    attack: [number, number];
    defense: [number, number];
    specialAttack: [number, number];
    specialDefense: [number, number];
    speed: [number, number];
  };
  setSearch: (search: string) => void;
  setType: (type: Type) => void;
  setHP: (range: [number, number]) => void;
  setAttack: (range: [number, number]) => void;
  setDefense: (range: [number, number]) => void;
  setSpecialAttack: (range: [number, number]) => void;
  setSpecialDefense: (range: [number, number]) => void;
  setSpeed: (range: [number, number]) => void;
} => {
  const pokemon = useSelector(selectPokemon);
  const search = useSelector(selectSearch);
  const filterTypes = useSelector(selectTypes);
  const hp = useSelector(selectHP);
  const attack = useSelector(selectAttack);
  const defense = useSelector(selectDefense);
  const specialAttack = useSelector(selectSpecialAttack);
  const specialDefense = useSelector(selectSpecialDefense);
  const speed = useSelector(selectSpeed);

  const dispatch = useDispatch();

  return {
    pokemon,
    filters: {
      search: search,
      types: filterTypes,
      hp: hp,
      attack: attack,
      defense: defense,
      specialAttack: specialAttack,
      specialDefense: specialDefense,
      speed: speed,
    },
    setSearch: (s) => dispatch(setSearch(s)),
    setType: (t) => dispatch(setType(t)),
    setHP: (h) => dispatch(setHP(h)),
    setAttack: (a) => dispatch(setAttack(a)),
    setDefense: (d) => dispatch(setDefense(d)),
    setSpecialAttack: (sa) => dispatch(setSpecialAttack(sa)),
    setSpecialDefense: (sd) => dispatch(setSpecialDefense(sd)),
    setSpeed: (s) => dispatch(setSpeed(s)),
  };
};
