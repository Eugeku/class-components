import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import CardList from '@components/CardList';
import Spinner from '@components/Spinner';
import Search from '@components/Search';
import Pagination from '@components/Pagination';
import BookDetails from '@components/BookDetails';
import useLocalStorage from '@utils/utils';
import { type Book } from '@/types';

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
  const selectedId = searchParams.get('details') || null;
  const itemsPerPage = 10;

  useEffect(() => {
    if (simulateError) throw new Error('Simulated error');
  }, [simulateError]);

  useEffect(() => {
    fetchBooks('');
  }, []);

  const fetchBooks = (term: string) => {
    setLoading(true);
    setErrorMsg('');

    const body = new URLSearchParams();
    if (term.trim()) body.append('title', term.trim());

    fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
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

  const handleSearch = () => {
    const clean = input.trim();
    setInput(clean);
    fetchBooks(clean);
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    updateSearchParams(1, null);
  };

  const handlePageChange = (page: number) => {
    updateSearchParams(page, selectedId);
  };

  const handleSelectItem = (id: string) => {
    updateSearchParams(currentPage, id);
  };

  const handleCloseDetails = () => {
    updateSearchParams(currentPage, null);
  };

  const updateSearchParams = (page: number, details: string | null) => {
    const params: Record<string, string> = {};
    if (books.length > itemsPerPage && page > 1) {
      params.page = String(page);
    }
    if (details) {
      params.details = details;
    }
    setSearchParams(params);
  };

  const totalPages = Math.ceil(books.length / itemsPerPage);
  const paginatedBooks = books.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Search
        value={input}
        onChange={handleInputChange}
        onSearch={handleSearch}
        onThrow={() => setSimulateError(true)}
      />
      <div className={`main-view ${selectedId ? 'split-view' : ''}`}>
        <div className="card-list">
          {loading && <Spinner />}
          {errorMsg && <div className="api-error">Error: {errorMsg}</div>}
          {!loading && (
            <CardList books={paginatedBooks} onSelectItem={handleSelectItem} />
          )}
          {!loading && books.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
        {selectedId && (
          <div className="details-pane">
            <BookDetails id={selectedId} onClose={handleCloseDetails} />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
