import React, { type ChangeEvent } from 'react';
import './Search.scss';

type Props = {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  onThrow: () => void;
}

const Search: React.FC<Props> = ({ value, onChange, onSearch, onThrow }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="search">
      <input
        value={value}
        onChange={handleChange}
        placeholder="Search books..."
      />
      <button className="search-button" onClick={onSearch}>
        Search
      </button>
      <button className="error-button" onClick={onThrow}>
        Throw Error
      </button>
    </div>
  );
};

export default Search;
