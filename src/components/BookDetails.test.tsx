import { render, screen, waitFor } from '@testing-library/react';
import {
  describe,
  it,
  vi,
  beforeEach,
  afterEach,
  expect,
  type Mock,
} from 'vitest';
import BookDetails from './BookDetails';
import type { Book } from '@/types';

vi.mock('@components/Spinner', () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

describe('BookDetails component', () => {
  const originalFetch = global.fetch;

  const mockBook: Book = {
    uid: 123,
    title: 'Mock Book',
    publishedYear: 1999,
    publishedMonth: 7,
    numberOfPages: 321,
    audiobook: true,
  };

  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ book: mockBook }),
      } as Response)
    );
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it('shows loading spinner initially', async () => {
    render(<BookDetails id="123" onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });
  });

  it('displays book details after successful fetch', async () => {
    render(<BookDetails id="123" onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText('Mock Book')).toBeInTheDocument();
      expect(screen.getByText(/Published:/)).toHaveTextContent('1999-7');
      expect(screen.getByText(/Pages:/)).toHaveTextContent('321');
      expect(screen.getByText(/Audiobook:/)).toHaveTextContent('Yes');
    });
  });

  it('shows error message if API returns non-ok response', async () => {
    (global.fetch as unknown as Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: false, status: 404 })
    );

    render(<BookDetails id="not-found" onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText(/API error: 404/)).toBeInTheDocument();
    });
  });

  it('shows fallback error if no book is returned', async () => {
    (global.fetch as unknown as Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ book: null }),
      })
    );

    render(<BookDetails id="missing" onClose={() => {}} />);

    await waitFor(() => {
      expect(screen.getByText('Book not found.')).toBeInTheDocument();
    });
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    render(<BookDetails id="123" onClose={onClose} />);

    await waitFor(() => {
      expect(screen.getByText('Mock Book')).toBeInTheDocument();
    });

    screen.getByRole('button', { name: /×/ }).click();

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
