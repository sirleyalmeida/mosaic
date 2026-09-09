import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Component / <Button />', () => {
  it('renders the text correctly and trigger the click event', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Enviar</Button>);

    const button = screen.getByRole('button', { name: /enviar/i });
    expect(button).toBeInTheDocument();

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders correctly and disables clicking when isLoading is true', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button isLoading onClick={handleClick}>
        Salvar
      </Button>
    );

    const button = screen.getByRole('button');
    
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(document.querySelector('svg[aria-hidden="true"]')).toBeInTheDocument();

    await user.click(button);
    expect(handleClick).not.toHaveBeenCalled();

    expect(screen.getByText('Salvar')).toBeInTheDocument();
  });

  it('renders as a link <a> maintaining styles when asChild is true', () => {
    render(
      <Button asChild variant="outline">
        <a href="https://github.com" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </Button>
    );

    const link = screen.getByRole('link', { name: /github/i });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveClass('border');
  });

  it('prevents interaction on a disabled asChild link', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button asChild disabled onClick={handleClick}>
        <a href="https://github.com">GitHub</a>
      </Button>,
    );

    const link = screen.getByRole('link', { name: /github/i });

    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).not.toHaveAttribute('disabled');

    await user.click(link);
    expect(handleClick).not.toHaveBeenCalled();
  });
});