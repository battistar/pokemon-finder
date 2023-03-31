import Card from 'components/Card';
import { PokemonProvider, usePokemon } from 'providers/store';

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
