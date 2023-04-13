import Card from 'components/Card';
import DualRangeSlider from 'components/DualRangeSlider';
import FilterChip from 'components/FilterChip';
import Search from 'components/Search';
import { PokemonProvider, Type, attributes, types, usePokemon } from 'providers/store';
import { useCallback, useState } from 'react';

const Filters = (): JSX.Element => {
  const { filters, setSearch, setType, setHP, setAttack, setDefense, setSpecialAttack, setSpecialDefense, setSpeed } =
    usePokemon();
  const [toggle, setToggle] = useState(false);

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

  const handleHPChange = useCallback(
    (range: [number, number]) => {
      setHP(range);
    },
    [setHP]
  );

  const handleAttackChange = useCallback(
    (range: [number, number]) => {
      setAttack(range);
    },
    [setAttack]
  );

  const handleDefenseChange = useCallback(
    (range: [number, number]) => {
      setDefense(range);
    },
    [setDefense]
  );

  const handleSpecialAttackChange = useCallback(
    (range: [number, number]) => {
      setSpecialAttack(range);
    },
    [setSpecialAttack]
  );

  const handleSpecialDefenseChange = useCallback(
    (range: [number, number]) => {
      setSpecialDefense(range);
    },
    [setSpecialDefense]
  );

  const handleSpeedChange = useCallback(
    (range: [number, number]) => {
      setSpeed(range);
    },
    [setSpeed]
  );

  const handleToggle = (): void => {
    setToggle((prevToggle) => {
      return !prevToggle;
    });
  };

  return (
    <div className="filter--container">
      <Search value={filters.search} onChange={handleChangeSearch} />
      <button className="filter-advanced--toggle" onClick={handleToggle}>
        {toggle ? 'Hide filters ↑' : 'Show filters ↓'}
      </button>
      <div className={`filter-advanced--container ${!toggle && 'hide'}`}>
        <div className="filter-advanced--types-container">
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
        <div className="filter-advanced--range-container">
          <DualRangeSlider
            title="HP"
            min={attributes.hp.min}
            max={attributes.hp.max}
            value={filters.hp}
            onChange={handleHPChange}
          />
          <DualRangeSlider
            title="Attack"
            min={attributes.attack.min}
            max={attributes.attack.max}
            value={filters.attack}
            onChange={handleAttackChange}
          />
          <DualRangeSlider
            title="Defense"
            min={attributes.defense.min}
            max={attributes.defense.max}
            value={filters.defense}
            onChange={handleDefenseChange}
          />
          <DualRangeSlider
            title="Special Attack"
            min={attributes.specialAttack.min}
            max={attributes.specialAttack.max}
            value={filters.specialAttack}
            onChange={handleSpecialAttackChange}
          />
          <DualRangeSlider
            title="Special Defense"
            min={attributes.specialDefense.min}
            max={attributes.specialDefense.max}
            value={filters.specialDefense}
            onChange={handleSpecialDefenseChange}
          />
          <DualRangeSlider
            title="Speed"
            min={attributes.speed.min}
            max={attributes.speed.max}
            value={filters.speed}
            onChange={handleSpeedChange}
          />
        </div>
      </div>
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
        <Filters />
        <PokemonList />
      </main>
    </PokemonProvider>
  );
};

export default App;
