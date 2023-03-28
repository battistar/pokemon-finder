import { PokemonProvider, usePokemon, Pokemon } from 'providers/store';

const Card = ({ pokemon }: { pokemon: Pokemon }): JSX.Element => {
  return (
    <div className="card">
      <img
        className="card--image"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
        alt={pokemon.name}
      />
      <h3 className="card--title">{pokemon.name}</h3>
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
        <PokemonList />
      </main>
    </PokemonProvider>
  );
};

export default App;
