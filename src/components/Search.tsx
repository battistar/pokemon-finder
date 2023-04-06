import { ChangeEvent } from 'react';

interface SearchProps {
  value: string;
  onChange: (text: string) => void;
}

const Search = ({ value, onChange }: SearchProps): JSX.Element => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const text = event.target.value;

    onChange(text);
  };

  return (
    <div className="search">
      <input
        className="search--input"
        name="search"
        type="text"
        placeholder="Search Pokemon..."
        autoComplete="off"
        autoFocus
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default Search;
