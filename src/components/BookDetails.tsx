import React, { useEffect, useState } from 'react';
import Spinner from '@components/Spinner';
import { type Book } from '@/types';
import './BookDetails.scss';

type Props = {
  id: string;
  onClose: () => void;
};

const API_DETAILS = 'https://stapi.co/api/v2/rest/book';

const BookDetails: React.FC<Props> = ({ id, onClose }) => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setLoading(true);
    setErrorMsg('');

    fetch(`${API_DETAILS}?uid=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setBook(data.book);
      })
      .catch((error: Error) => {
        setErrorMsg(error.message);
        setBook(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner />;
  if (errorMsg) return <div className="api-error">Error: {errorMsg}</div>;
  if (!book) return <div className="api-error">Book not found.</div>;

  return (
    <div className="book-details">
      <button className="close-button" onClick={onClose}>
        ×
      </button>
      <h2>{book.title}</h2>
      <p>
        Published: {book.publishedYear}-{book.publishedMonth}
      </p>
      <p>Pages: {book.numberOfPages}</p>
      <p>Audiobook: {book.audiobook ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default BookDetails;
