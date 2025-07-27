import React from 'react';
import { type Book } from '@/types';
import './Card.scss';

type CardProps = {
  book: Book;
};

const Card: React.FC<CardProps> = ({ book }) => {
  return (
    <div className="card">
      <strong>{book.title}</strong>
      <div>Published Year: {book.publishedYear}</div>
      <div>Published Month: {book.publishedMonth}</div>
      <div>Pages: {book.numberOfPages}</div>
      <div>Audiobook: {book.audiobook ? 'Yes' : 'No'}</div>
    </div>
  );
};

export default Card;
