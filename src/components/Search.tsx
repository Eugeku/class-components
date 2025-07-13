import { Component, type ChangeEvent } from 'react';
import './Search.scss';

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  onThrow: () => void;
}

export default class Search extends Component<Props> {
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(e.target.value);
  };

  render() {
    return (
      <div className="search">
        <input
          value={this.props.value}
          onChange={this.handleChange}
          placeholder="Search books..."
        />
        <button className="search-button" onClick={this.props.onSearch}>
          Search
        </button>
        <button className="error-button" onClick={this.props.onThrow}>
          Throw Error
        </button>
      </div>
    );
  }
}
