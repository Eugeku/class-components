import React from 'react';
import Card from '@components/Card';
import { type Book } from '@/types';

type Props = {
  books: Book[];
  onSelectItem?: (id: string) => void;
};

const CardList: React.FC<Props> = ({ books, onSelectItem }) => {
  return (
    <>
      {books.map((book) => (
        <Card
          key={book.title}
          book={book}
          onClick={() => onSelectItem?.(book.uid.toString())}
        />
      ))}
    </>
  );
};

export default CardList;
