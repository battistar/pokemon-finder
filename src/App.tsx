import Card from 'components/Card';
import { PokemonProvider, usePokemon } from 'providers/store';
import { ChangeEvent } from 'react';

const Search = (): JSX.Element => {
  const { search, setSearch } = usePokemon();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const text = event.target.value;

    setSearch(text);
  };

  return (
    <div className="search">
      <input
        className="search--input"
        name="search"
        type="text"
        placeholder="Search Pokemon..."
        onChange={handleChange}
        value={search}
      />
    </div>
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
        <Search />
        <PokemonList />
      </main>
    </PokemonProvider>
  );
};

export default App;
