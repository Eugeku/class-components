import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '@components/NotFound';

describe('NotFound component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );
  });

  it('renders the 404 heading', () => {
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('404 – Page Not Found');
  });

  it('renders the explanatory paragraph', () => {
    expect(screen.getByText('The page you are looking for does not exist.')).toBeInTheDocument();
  });

  it('renders a link back to homepage with correct href', () => {
    const link = screen.getByRole('link', { name: /go back to homepage/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
