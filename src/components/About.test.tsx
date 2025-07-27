import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from './About';

vi.mock('@components/Navigation', () => ({
  default: () => <nav data-testid="navigation">Mock Navigation</nav>,
}));

describe('About Page component', () => {
  it('renders the heading and author link', () => {
    render(<About />);

    expect(
      screen.getByRole('heading', { name: /About page/i })
    ).toBeInTheDocument();

    const authorLink = screen.getByRole('link', { name: /Eugeku/i });
    expect(authorLink).toBeInTheDocument();
    expect(authorLink).toHaveAttribute('href', 'https://github.com/Eugeku');
    expect(authorLink).toHaveAttribute('target', '_blank');
  });

  it('renders RS School course link', () => {
    render(<About />);

    const courseLink = screen.getByRole('link', {
      name: /RS School React course/i,
    });
    expect(courseLink).toBeInTheDocument();
    expect(courseLink).toHaveAttribute(
      'href',
      'https://rs.school/courses/reactjs'
    );
    expect(courseLink).toHaveAttribute('target', '_blank');
  });

  it('includes the navigation component', () => {
    render(<About />);
    expect(screen.getByTestId('navigation')).toHaveTextContent(
      'Mock Navigation'
    );
  });
});
