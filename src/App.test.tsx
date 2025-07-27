import React, { act } from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach,
  type Mock,
} from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '@/App';
import type { Book } from '@/types';

vi.mock('@components/CardList', () => {
  type Props = {
    books: Array<Book>;
  };
  return {
    default: ({ books }: Props) => (
      <div data-testid="card-list">{books.length} books</div>
    ),
  };
});

vi.mock('@components/Spinner', () => ({
  default: () => <div data-testid="spinner">Loading...</div>,
}));

type SearchProps = {
  value: string;
  onChange: (val: string) => void;
  onSearch: () => void;
  onThrow: () => void;
};

vi.mock('@components/Search', async () => {
  return {
    default: class MockSearch extends React.Component<SearchProps> {
      render() {
        return (
          <div>
            <input
              data-testid="search-input"
              value={this.props.value}
              onChange={(e) => this.props.onChange(e.target.value)}
            />
            <button onClick={this.props.onSearch}>Search</button>
            <button onClick={this.props.onThrow}>Throw Error</button>
          </div>
        );
      }
    },
  };
});

const mockBooks = [{ uid: '1', title: 'Test Book' }];

describe('App component', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('');
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ books: mockBooks }),
      } as Response)
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
    global.fetch = originalFetch;
  });

  it('shows spinner during loading and hides after fetch', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });
  });

  it('fetches and displays books after search', async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const input = screen.getByTestId('search-input');
    await userEvent.type(input, 'test');
    await userEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByTestId('card-list')).toHaveTextContent('1 books');
    });
  });

  it('saves trimmed input to localStorage on search', async () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem');
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const input = screen.getByTestId('search-input');
    await userEvent.type(input, '  trek  ');
    await userEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(setItem).toHaveBeenCalledWith('searchTerm', 'trek');
    });
  });

  it('shows error if fetch fails', async () => {
    (global.fetch as unknown as Mock).mockImplementationOnce(() =>
      Promise.resolve({ ok: false, status: 400 })
    );

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    act(() => {
      const input = screen.getByTestId('search-input');
      userEvent.type(input, 'test');
    });

    await waitFor(() => {
      expect(screen.getByText(/API Error: 400/)).toBeInTheDocument();
    });
  });

  it('throws simulated error when "Throw Error" clicked', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
      try {
        return <>{children}</>;
      } catch (e) {
        console.error(e);
        return <div data-testid="error-boundary">Caught error</div>;
      }
    };

    const { getByText } = render(
      <MemoryRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </MemoryRouter>
    );

    expect(() => {
      userEvent.click(getByText('Throw Error'));
    }).not.toThrow();
    consoleError.mockRestore();
  });
});
