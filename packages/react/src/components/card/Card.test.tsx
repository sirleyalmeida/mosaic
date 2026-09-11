import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Component / <Card />', () => {
  it('renders card root with correct composite layout structure', () => {
    render(
      <Card data-testid="card-root">
        <Card.Header>
          <Card.Title>Account Settings</Card.Title>
          <Card.Description>Update your email address</Card.Description>
        </Card.Header>
        <Card.Body>Form details here</Card.Body>
        <Card.Footer>Footer Actions</Card.Footer>
      </Card>
    );

    expect(screen.getByTestId('card-root')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Account Settings' })).toBeInTheDocument();
    expect(screen.getByText('Update your email address')).toBeInTheDocument();
    expect(screen.getByText('Form details here')).toBeInTheDocument();
    expect(screen.getByText('Footer Actions')).toBeInTheDocument();
  });

  it('applies interactive state variant classes correctly', () => {
    render(
      <Card asChild variant="interactive" data-testid="card-interactive">
        <a href="/settings">Clickable Card</a>
      </Card>
    );

    const card = screen.getByRole('link', { name: 'Clickable Card' });
    expect(card).toHaveClass('hover:border-accent', 'cursor-pointer');
  });

  it('supports configurable heading levels', () => {
    render(<Card.Title as="h2">Settings</Card.Title>);

    expect(screen.getByRole('heading', { level: 2, name: 'Settings' })).toBeInTheDocument();
  });

  it('rejects asChild without the interactive variant', () => {
    expect(() =>
      render(
        <Card asChild>
          <a href="/settings">Settings</a>
        </Card>
      )
    ).toThrow(/requires the interactive variant/i);
  });
});