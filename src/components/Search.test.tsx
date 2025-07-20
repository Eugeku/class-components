import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';

describe('Search component', () => {
  const setup = () => {
    const onChange = vi.fn();
    const onSearch = vi.fn();
    const onThrow = vi.fn();

    render(
      <Search
        value="initial"
        onChange={onChange}
        onSearch={onSearch}
        onThrow={onThrow}
      />
    );

    return { onChange, onSearch, onThrow };
  };

  it('renders input with initial value', () => {
    render(
      <Search
        value="Test value"
        onChange={() => {}}
        onSearch={() => {}}
        onThrow={() => {}}
      />
    );

    const input = screen.getByPlaceholderText('Search books...') as HTMLInputElement;
    expect(input.value).toBe('Test value');
  });

  it('calls onChange when input changes', () => {
    const { onChange } = setup();
    const input = screen.getByPlaceholderText('Search books...');

    fireEvent.change(input, { target: { value: 'New search' } });
    expect(onChange).toHaveBeenCalledWith('New search');
  });

  it('calls onSearch when search button is clicked', () => {
    const { onSearch } = setup();
    const button = screen.getByText('Search');

    fireEvent.click(button);
    expect(onSearch).toHaveBeenCalled();
  });

  it('calls onThrow when throw button is clicked', () => {
    const { onThrow } = setup();
    const button = screen.getByText('Throw Error');

    fireEvent.click(button);
    expect(onThrow).toHaveBeenCalled();
  });
});
