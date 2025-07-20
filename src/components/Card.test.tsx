
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import type { Book } from '@/types';

describe('Card component', () => {
  const mockBook: Book = {
    title: 'Test Book',
    publishedYear: 2022,
    publishedMonth: 10,
    numberOfPages: 320,
    audiobook: true,
  };

  it('renders book information correctly', () => {
    render(<Card book={mockBook} />);

    expect(screen.getByText('Test Book')).toBeInTheDocument();
    expect(screen.getByText('Published Year: 2022')).toBeInTheDocument();
    expect(screen.getByText('Published Month: 10')).toBeInTheDocument();
    expect(screen.getByText('Pages: 320')).toBeInTheDocument();
    expect(screen.getByText('Audiobook: Yes')).toBeInTheDocument();
  });

  it('shows "No" when audiobook is false', () => {
    render(
      <Card
        book={{
          ...mockBook,
          audiobook: false,
        }}
      />,
    );

    expect(screen.getByText('Audiobook: No')).toBeInTheDocument();
  });

  it('shows "Yes" when audiobook is true', () => {
    render(
      <Card
        book={{
          ...mockBook,
          audiobook: true,
        }}
      />,
    );

    expect(screen.getByText('Audiobook: Yes')).toBeInTheDocument();
  });
});
