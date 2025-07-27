import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '@utils/utils';

describe('useLocalStorage hook', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty string if nothing is saved', () => {
    const { result } = renderHook(() => useLocalStorage('searchTerm', ''));

    expect(result.current[0]).toBe('');
  });

  it('saves and retrieves the search ter', () => {
    const { result } = renderHook(() => useLocalStorage('searchTerm', ''));

    act(() => {
      result.current[1]('react');
    });

    expect(localStorage.getItem('searchTerm')).toBe('react');
    expect(result.current[0]).toBe('react');
  });

  it('overwrites previous value', () => {
    const { result } = renderHook(() => useLocalStorage('searchTerm', ''));

    act(() => {
      result.current[1]('vite');
    });
    act(() => {
      result.current[1]('vitest');
    });

    expect(localStorage.getItem('searchTerm')).toBe('vitest');
    expect(result.current[0]).toBe('vitest');
  });
});
