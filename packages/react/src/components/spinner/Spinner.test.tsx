import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from './Spinner';

describe('Component / <Spinner />', () => {
  it('renders correctly with default accessibility role and label', () => {
    render(<Spinner />);

    const spinner = screen.getByRole('status', { name: /loading\.\.\./i });
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('motion-safe:animate-spin');
  });

  it('allows custom aria-label for accessibility context', () => {
    render(<Spinner label="Fetching user data" />);

    expect(screen.getByRole('status', { name: 'Fetching user data' })).toBeInTheDocument();
  });

  it('applies variant and size classes appropriately', () => {
    const { container } = render(<Spinner size="lg" variant="accent" />);
    
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('h-8', 'w-8', 'text-accent');
  });

  it('supports disabling animation for static loading states', () => {
    render(<Spinner animated={false} />);

    expect(screen.getByRole('status')).not.toHaveClass('motion-safe:animate-spin');
  });

  it('supports decorative mode for use alongside visible loading text', () => {
    const { container } = render(<Spinner decorative />);

    const spinner = container.querySelector('svg');
    expect(spinner).toHaveAttribute('aria-hidden', 'true');
    expect(spinner).not.toHaveAttribute('role');
    expect(spinner).not.toHaveAttribute('aria-label');
  });
});