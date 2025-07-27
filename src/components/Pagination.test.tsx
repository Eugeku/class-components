import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination component', () => {
  const setup = (currentPage: number, totalPages: number = 5) => {
    const onPageChange = vi.fn();

    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    );

    return { onPageChange };
  };

  it('does not render if totalPages is 1 or less', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('disables "Previous" on first page', () => {
    setup(1);
    const prevButton = screen.getByText('Previous') as HTMLButtonElement;
    expect(prevButton.disabled).toBe(true);
  });

  it('disables "Next" on last page', () => {
    setup(5, 5);
    const nextButton = screen.getByText('Next') as HTMLButtonElement;
    expect(nextButton.disabled).toBe(true);
  });

  it('shows correct page indicator', () => {
    setup(3, 5);
    expect(screen.getByText('Page 3 of 5')).toBeInTheDocument();
  });

  it('calls onPageChange with previous page when "Previous" clicked', () => {
    const { onPageChange } = setup(3);
    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with next page when "Next" clicked', () => {
    const { onPageChange } = setup(3);
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('does not go below page 1 when "Previous" clicked on first page', () => {
    const { onPageChange } = setup(1, 3);
    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);
    expect(onPageChange).not.toHaveBeenCalled();
  });

  it('does not go above totalPages when "Next" clicked on last page', () => {
    const { onPageChange } = setup(3, 3);
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(onPageChange).not.toHaveBeenCalled();
  });
});
