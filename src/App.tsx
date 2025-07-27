import React, { useState, useEffect } from 'react';

import CardList from '@components/CardList';
import Spinner from '@components/Spinner';
import Search from '@components/Search';
import { type Book } from '@/types';
import { getStoredSearchTerm, saveSearchTerm } from '@utils/utils';
import './App.scss';

const API_BASE = 'https://stapi.co/api/v2/rest/book/search';

const App: React.FC = () => {
  const [input, setInput] = useState(getStoredSearchTerm());
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [simulateError, setSimulateError] = useState(false);

  useEffect(() => {
    if (simulateError) {
      throw new Error('Simulated error');
    }
  }, [simulateError]);

  useEffect(() => {
    fetchBooks(input);
  }, []);

  const fetchBooks = (term: string) => {
    setLoading(true);
    setErrorMsg('');

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
        setBooks(data.books || []);
      })
      .catch((error: Error) => {
        setErrorMsg(error.message);
        setBooks([]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const handleSearch = () => {
    const clean = input.trim();
    setInput(clean);
    saveSearchTerm(clean);
    fetchBooks(clean);
  };

  const triggerError = () => {
    setSimulateError(true);
  };

  return (
    <>
      <Search
        value={input}
        onChange={handleInputChange}
        onSearch={handleSearch}
        onThrow={triggerError}
      />
      <div className="card-list">
        {loading && <Spinner />}
        {errorMsg && <div className="api-error">Error: {errorMsg}</div>}
        {!loading && <CardList books={books} />}
      </div>
    </>
  );
};

export default App;
