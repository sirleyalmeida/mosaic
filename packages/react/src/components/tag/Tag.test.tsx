import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Tag } from './Tag';

describe('Component / <Tag />', () => {
  it('renders correctly', () => {
    render(<Tag>Design System</Tag>);

    expect(screen.getByText('Design System')).toBeInTheDocument();
  });

  it('displays the correct content', async () => {
    const handleRemove = vi.fn();
    const handleContainerClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Tag onClick={handleContainerClick} onRemove={handleRemove}>
        TypeScript
      </Tag>
    );

    const removeButton = screen.getByRole('button', { name: /remover tag/i });
    expect(removeButton).toBeInTheDocument();

    await user.click(removeButton);

    expect(handleRemove).toHaveBeenCalledTimes(1);
    expect(handleContainerClick).not.toHaveBeenCalled();
  });

  it('allows customizing the aria-label of the remove button', () => {
    render(
      <Tag onRemove={() => {}} removeButtonAriaLabel="Excluir filtro">
        React
      </Tag>
    );

    expect(
      screen.getByRole('button', { name: 'Excluir filtro' })
    ).toBeInTheDocument();
  });

  it('renders as a custom element while maintaining styles when asChild is true', () => {
    render(
      <Tag asChild variant="solid">
        <a href="https://mosaic.design" target="_blank" rel="noreferrer">
          Documentação
        </a>
      </Tag>
    );

    const link = screen.getByRole('link', { name: /documentação/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://mosaic.design');
    expect(link).toHaveAttribute('target', '_blank');
    
    // Verifica se as classes do CVA foram transferidas ao elemento <a>
    expect(link).toHaveClass('bg-accent');
  });

  it('renders the left icon when provided', () => {
    render(
      <Tag leftIcon={<span data-testid="custom-icon">★</span>}>
        With Icon
      </Tag>
    );

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('allows keyboard activation when clickable', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Tag onClick={handleClick}>TypeScript</Tag>);

    const tag = screen.getByRole('button', { name: 'TypeScript' });
    tag.focus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');

    expect(handleClick).toHaveBeenCalledTimes(2);
    expect(tag).toHaveAttribute('tabindex', '0');
  });

  it('rejects asChild when combined with onRemove', () => {
    expect(() =>
      render(
        <Tag asChild onRemove={() => {}}>
          <a href="/tags">Tag</a>
        </Tag>
      )
    ).toThrow(/cannot combine asChild with onRemove/i);
  });
});