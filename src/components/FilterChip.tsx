import { Type } from 'providers/store';

interface FilterChipProps {
  type: Type;
  onClick: (type: Type) => void;
  active?: boolean;
}

const FilterChip = ({ type, onClick, active = false }: FilterChipProps): JSX.Element => {
  const handleClick = (): void => {
    onClick(type);
  };

  return (
    <button className={`filter-chip ${type.toLowerCase()} ${active ? 'active' : ''}`} onClick={handleClick}>
      {type}
    </button>
  );
};

export default FilterChip;
