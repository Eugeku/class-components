import React from 'react';
import Card from '@components/Card';
import { type Book } from '@/types';

type Props = {
  books: Book[];
}

const CardList: React.FC<Props> = ({ books }) => {
  return (
    <>
      {books.map((book) => (
        <Card key={book.title} book={book} />
      ))}
    </>
  );
};

export default CardList;
