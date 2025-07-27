import React from 'react';
import { type Book } from '@/types';
import './Card.scss';

type CardProps = {
  book: Book;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({ book, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <strong>{book.title}</strong>
      <div>Published Year: {book.publishedYear}</div>
      <div>Published Month: {book.publishedMonth}</div>
      <div>Pages: {book.numberOfPages}</div>
      <div>Audiobook: {book.audiobook ? 'Yes' : 'No'}</div>
    </div>
  );
};

export default Card;
