import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, expect, it, vi } from 'vitest';
import { Modal } from './Modal';

expect.extend(toHaveNoViolations);

describe('Component / <Modal />', () => {
  it('renders its title and description when open', () => {
    render(
      <Modal isOpen onClose={vi.fn()} title="Account settings">
        Update your account details.
      </Modal>,
    );

    expect(screen.getByRole('dialog', { name: 'Account settings' })).toBeInTheDocument();
    expect(screen.getByText('Update your account details.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fechar' })).toBeInTheDocument();
  });

  it('closes when Escape is pressed', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal isOpen onClose={onClose} title="Closeable modal">
        Modal content.
      </Modal>,
    );

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledWith(false);
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Modal isOpen onClose={vi.fn()} title="Accessible modal">
        Accessible content.
      </Modal>,
    );

    expect(await axe(container)).toHaveNoViolations();
  });
});