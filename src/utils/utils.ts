export const getStoredSearchTerm = (): string => {
  return localStorage.getItem('searchTerm') || '';
};

export const saveSearchTerm = (term: string) => {
  localStorage.setItem('searchTerm', term);
};
