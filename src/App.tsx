import React, { useState, useEffect } from 'react';

import CardList from '@components/CardList';
import Spinner from '@components/Spinner';
import Search from '@components/Search';
import { type Book } from '@/types';
import useLocalStorage from '@utils/utils';
import Pagination from '@components/Pagination';
import { useSearchParams } from 'react-router-dom';
import './App.scss';

const API_BASE = 'https://stapi.co/api/v2/rest/book/search';

const App: React.FC = () => {
  const [input, setInput] = useLocalStorage('searchTerm', '');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [simulateError, setSimulateError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPage = 10;

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

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    handlePageChange(1);
  };

  const totalPages = Math.ceil(books.length / itemsPerPage);
  const paginatedBooks = books.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => {
    const clean = input.trim();
    setInput(clean);
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
        {!loading && <CardList books={paginatedBooks} />}
        {!loading && books.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </>
  );
};

export default App;
