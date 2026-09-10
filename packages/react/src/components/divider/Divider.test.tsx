import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Divider } from './Divider';

describe('Divider Component', () => {
  it('renders decorative horizontal divider by default without accessibility roles', () => {
    const { container } = render(<Divider />);
    
    const element = container.querySelector('div');
    expect(element).toBeInTheDocument();
    expect(element).not.toHaveAttribute('role', 'separator');
  });

  it('exposes aria separator role and attributes when decorative is false', () => {
    render(<Divider decorative={false} />);
    
    const separator = screen.getByRole('separator');
    expect(separator).toBeInTheDocument();
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('renders vertical orientation correctly with accessibility attributes', () => {
    render(<Divider orientation="vertical" decorative={false} />);
    
    const separator = screen.getByRole('separator');
    expect(separator).toHaveAttribute('aria-orientation', 'vertical');
    expect(separator).toHaveClass('w-[1px]');
  });

  it('renders a centered text label when children are provided in horizontal mode', () => {
    render(<Divider>OR</Divider>);
    
    const label = screen.getByText('OR');
    expect(label).toBeInTheDocument();
    expect(label.tagName.toLowerCase()).toBe('span');
  });

  it('supports an explicit label without duplicating element attributes', () => {
    render(
      <Divider label="Continue" id="account-divider" data-testid="divider" />
    );

    const wrapper = screen.getByTestId('divider');
    expect(wrapper).toHaveAttribute('id', 'account-divider');
    expect(screen.getByText('Continue')).toBeInTheDocument();
    expect(document.querySelectorAll('[id="account-divider"]')).toHaveLength(1);
  });

  it('rejects labels on vertical dividers', () => {
    expect(() => render(<Divider orientation="vertical" label="Not supported" />))
      .toThrow(/only supported with horizontal orientation/i);
  });

  it('applies design token variant classes properly', () => {
    const { container } = render(<Divider variant="accent" />);
    
    const divider = container.firstChild;
    expect(divider).toHaveClass('bg-accent');
  });
});