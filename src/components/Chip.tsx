import { Type } from 'providers/store';

const Chip = ({ type }: { type: Type }): JSX.Element => {
  return <div className={`chip ${type.toLowerCase()}`}>{type}</div>;
};

export default Chip;
