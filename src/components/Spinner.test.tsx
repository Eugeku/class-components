import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner component', () => {
  it('renders spinner container', () => {
    render(<Spinner />);
    const container = document.querySelector('.spinner-container');
    expect(container).toBeTruthy();
  });

  it('renders spinner element', () => {
    render(<Spinner />);
    const spinner = document.querySelector('.spinner');
    expect(spinner).toBeTruthy();
  });
});
