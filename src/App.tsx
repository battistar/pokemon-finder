import Card from 'components/Card';
import FilterChip from 'components/FilterChip';
import Search from 'components/Search';
import { PokemonProvider, Type, types, usePokemon } from 'providers/store';
import { useCallback } from 'react';

const Filters = (): JSX.Element => {
  const { filters, setSearch, setType } = usePokemon();

  const handleClickChip = useCallback(
    (type: Type): void => {
      setType(type);
    },
    [setType]
  );

  const handleChangeSearch = useCallback(
    (text: string): void => {
      setSearch(text);
    },
    [setSearch]
  );

  return (
    <>
      <Search value={filters.search} onChange={handleChangeSearch} />
      <div className="filter--types-container">
        {types.map((type) => {
          return (
            <FilterChip
              key={type}
              type={type as Type}
              onClick={handleClickChip}
              active={filters.types.includes(type as Type)}
            />
          );
        })}
      </div>
    </>
  );
};

const PokemonList = (): JSX.Element => {
  const { pokemon } = usePokemon();

  return (
    <div className="list-container">
      <div className="row">
        {pokemon.map((p) => {
          return (
            <div key={p.id} className="col-s-6 col-m-4 col-l-3">
              <Card pokemon={p} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const App = (): JSX.Element => {
  return (
    <PokemonProvider>
      <main>
        <Filters />
        <PokemonList />
      </main>
    </PokemonProvider>
  );
};

export default App;
