import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardList from '@components/CardList';
import type { Book } from '@/types';

vi.mock('@components/Card', () => ({
  default: ({ book }: { book: Book }) => (
    <div data-testid="card">{book.title}</div>
  ),
}));

describe('CardList component', () => {
  const books: Book[] = [
    {
      title: 'Book One',
      publishedYear: 2021,
      publishedMonth: 5,
      numberOfPages: 200,
      audiobook: true,
    },
    {
      title: 'Book Two',
      publishedYear: 2020,
      publishedMonth: 6,
      numberOfPages: 150,
      audiobook: false,
    },
  ];

  it('renders the correct number of cards', () => {
    render(<CardList books={books} />);

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent(books[0].title);
    expect(cards[1]).toHaveTextContent(books[1].title);
  });

  it('renders nothing if the book list is empty', () => {
    render(<CardList books={[]} />);
    expect(screen.queryByTestId('card')).toBeNull();
  });
});
