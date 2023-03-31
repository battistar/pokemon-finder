import { Pokemon } from 'providers/store';
import Chip from './Chip';

const Card = ({ pokemon }: { pokemon: Pokemon }): JSX.Element => {
  return (
    <div className="card">
      <img
        className="card--image"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
        alt={pokemon.name}
      />
      <h3 className="card--title">{pokemon.name}</h3>
      <div className="card--type">
        {pokemon.type.map((t) => {
          return <Chip key={t} type={t} />;
        })}
      </div>

      <ul className="card--param-list">
        <li className="card--param-item hp">HP - {pokemon.hp}</li>
        <li className="card--param-item attack">ATTACK - {pokemon.attack}</li>
        <li className="card--param-item defence">DEFENSE - {pokemon.defense}</li>
        <li className="card--param-item special-attack">SPECIAL ATTACK - {pokemon.attack}</li>
        <li className="card--param-item special-defence">SPECIAL DEFENCE - {pokemon.defense}</li>
        <li className="card--param-item speed">SPEED - {pokemon.speed}</li>
      </ul>
    </div>
  );
};

export default Card;
