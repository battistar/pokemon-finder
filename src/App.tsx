import Card from 'components/Card';
import DualRangeSlider from 'components/DualRangeSlider';
import FilterChip from 'components/FilterChip';
import Search from 'components/Search';
import { PokemonProvider, Type, attributes, types, usePokemon } from 'providers/store';
import { useCallback, useState } from 'react';

const Filters = (): JSX.Element => {
  const { filters } = usePokemon();

  const handleChangeSearch = useCallback(
    (text: string): void => {
      filters.setSearch(text);
    },
    [filters]
  );

  return (
    <div className="filter--container">
      <Search value={filters.search} onChange={handleChangeSearch} />
    </div>
  );
};

const AdvancedFilters = (): JSX.Element => {
  const { filters } = usePokemon();
  const [toggle, setToggle] = useState(false);

  const handleClickChip = useCallback(
    (type: Type): void => {
      filters.setType(type);
    },
    [filters]
  );

  const handleHPChange = useCallback(
    (range: [number, number]) => {
      filters.setHP(range);
    },
    [filters]
  );

  const handleAttackChange = useCallback(
    (range: [number, number]) => {
      filters.setAttack(range);
    },
    [filters]
  );

  const handleDefenseChange = useCallback(
    (range: [number, number]) => {
      filters.setDefense(range);
    },
    [filters]
  );

  const handleSpecialAttackChange = useCallback(
    (range: [number, number]) => {
      filters.setSpecialAttack(range);
    },
    [filters]
  );

  const handleSpecialDefenseChange = useCallback(
    (range: [number, number]) => {
      filters.setSpecialDefense(range);
    },
    [filters]
  );

  const handleSpeedChange = useCallback(
    (range: [number, number]) => {
      filters.setSpeed(range);
    },
    [filters]
  );

  const handleToggle = (): void => {
    setToggle((prevToggle) => {
      return !prevToggle;
    });
  };

  const handleResetClick = (): void => {
    filters.reset();
  };

  return (
    <div className="filter-advanced--container">
      <button className="filter-advanced--toggle" onClick={handleToggle}>
        {toggle ? 'Hide filters ↑' : 'Show filters ↓'}
      </button>
      <div className={`filter-advanced--content ${!toggle && 'hide'}`}>
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
          <button className="filter-advanced--reset-button" onClick={handleResetClick}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

const PokemonList = (): JSX.Element => {
  const { pokemon } = usePokemon();

  return (
    <>
      {pokemon.length > 0 ? (
        <div className="list-container">
          <div className="row">
            {pokemon.map((p) => {
              return (
                <div key={p.id} className="col-s-6 col-m-4">
                  <Card pokemon={p} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="not-found">Pokemon not found</div>
      )}
    </>
  );
};

const App = (): JSX.Element => {
  return (
    <PokemonProvider>
      <main>
        <Filters />
        <div className="container">
          <AdvancedFilters />
          <PokemonList />
        </div>
      </main>
    </PokemonProvider>
  );
};

export default App;
