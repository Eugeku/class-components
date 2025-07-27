
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '@/AppRoutes';

vi.mock('@/App', () => ({
  default: () => <div data-testid="app">App Component</div>,
}));
vi.mock('@/components/NotFound', () => ({
  default: () => <div data-testid="not-found">NotFound Component</div>,
}));

describe('AppRoutes component', () => {
  it('renders App component on "/" route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByTestId('app')).toBeInTheDocument();
  });

  it('renders NotFound component on unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/some/path']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});
