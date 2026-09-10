import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Component / <Skeleton />', () => {
  it('renders as hidden from accessibility tree to prevent screen reader noise', () => {
    const { container } = render(<Skeleton />);
    
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveAttribute('aria-hidden', 'true');
    expect(skeleton).toHaveClass('motion-safe:animate-pulse');
  });

  it('applies inline pixel dimensions when numeric props are passed', () => {
    const { container } = render(<Skeleton variant="circular" width={40} height={40} />);
    
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton.style.width).toBe('40px');
    expect(skeleton.style.height).toBe('40px');
    expect(skeleton).toHaveClass('rounded-full');
  });

  it('supports string percentage dimensions for layout shift mitigation', () => {
    const { container } = render(<Skeleton width="100%" height="2rem" />);
    
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton.style.width).toBe('100%');
    expect(skeleton.style.height).toBe('2rem');
  });

  it('provides default dimensions for circular and rectangular variants', () => {
    const { container } = render(
      <>
        <Skeleton variant="circular" />
        <Skeleton variant="rectangular" />
      </>
    );

    const [circular, rectangular] = Array.from(container.children) as HTMLElement[];
    expect(circular.style.width).toBe('40px');
    expect(circular.style.height).toBe('40px');
    expect(rectangular.style.width).toBe('100%');
    expect(rectangular.style.height).toBe('120px');
  });

  it('supports disabling animation for static placeholders', () => {
    const { container } = render(<Skeleton animated={false} />);

    expect(container.firstChild).not.toHaveClass('motion-safe:animate-pulse');
  });

  it('keeps aria-hidden enforced when consumers pass conflicting props', () => {
    const { container } = render(<Skeleton aria-hidden={false} />);

    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });
});