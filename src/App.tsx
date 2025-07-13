import { Component } from 'react';
import Search from './components/Search';
import CardList from './components/CardList';
import Spinner from './components/Spinner';
import { type Book } from './types';
import { getStoredSearchTerm, saveSearchTerm } from './utils';

const API_BASE = 'https://stapi.co/api/v2/rest/book/search';

interface State {
  input: string;
  books: Book[];
  loading: boolean;
  errorMsg: string;
}

export default class App extends Component {
  state: State = {
    input: getStoredSearchTerm(),
    books: [],
    loading: false,
    errorMsg: '',
  };

  componentDidMount() {
    this.fetchBooks(this.state.input);
  }

  fetchBooks(term: string) {
    this.setState({ loading: true, errorMsg: '' });

    const body = new URLSearchParams();
    if (term.trim()) {
      body.append('title', term.trim());
    }

    fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`API Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({ books: data.books || [] });
      })
      .catch((error: Error) => {
        this.setState({ errorMsg: error.message, books: [] });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  handleInputChange = (value: string) => {
    this.setState({ input: value });
  };

  handleSearch = () => {
    const clean = this.state.input.trim();
    this.setState({ input: clean });
    saveSearchTerm(clean);
    this.fetchBooks(clean);
  };

  triggerError = () => {
    this.setState({ simulateError: true });
  };

  render() {
    const { input, books, loading, errorMsg } = this.state;

    return (
      <>
        <Search
          value={input}
          onChange={this.handleInputChange}
          onSearch={this.handleSearch}
        />
        <div style={{ padding: '1rem' }}>
          {loading && <Spinner />}
          {errorMsg && <div style={{ color: 'red' }}>Error: {errorMsg}</div>}
          {!loading && <CardList books={books} />}
        </div>
      </>
    );
  }
}
