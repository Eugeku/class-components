import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  const ErrorComponent = () => {
    throw new Error('Test error');
  };

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Everything is fine</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Everything is fine')).toBeInTheDocument();
  });

  it('catches error and renders fallback UI', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Synthetick Error')).toBeInTheDocument();
  });
});
