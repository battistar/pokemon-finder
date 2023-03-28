import { PokemonProvider } from 'providers/store';

const App = (): JSX.Element => {
  return (
    <PokemonProvider>
      <div></div>
    </PokemonProvider>
  );
};

export default App;
