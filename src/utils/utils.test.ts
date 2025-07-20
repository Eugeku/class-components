import { describe, it, expect, beforeEach } from 'vitest';
import { getStoredSearchTerm, saveSearchTerm } from '@utils/utils';

describe('storage utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty string if nothing is saved', () => {
    expect(getStoredSearchTerm()).toBe('');
  });

  it('saves and retrieves the search term', () => {
    saveSearchTerm('react');
    expect(localStorage.getItem('searchTerm')).toBe('react');
    expect(getStoredSearchTerm()).toBe('react');
  });

  it('overwrites previous value', () => {
    saveSearchTerm('vite');
    saveSearchTerm('vitest');
    expect(getStoredSearchTerm()).toBe('vitest');
  });
});
