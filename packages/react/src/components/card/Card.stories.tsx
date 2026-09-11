import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../button/Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'interactive'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-[380px]">
      <Card.Header>
        <Card.Title>Email notifications</Card.Title>
        <Card.Description>Choose how often you want to receive alerts.</Card.Description>
      </Card.Header>
      <Card.Body className="text-sm text-text-secondary">
        You can change these preferences at any time from your settings dashboard.
      </Card.Body>
      <Card.Footer>
        <Button variant="outline" size="sm">Cancel</Button>
        <Button variant="solid" size="sm">Save</Button>
      </Card.Footer>
    </Card>
  ),
};

export const InteractiveLink: Story = {
  render: () => (
    <Card asChild variant="interactive" className="w-[380px]">
      <a href="/settings">
        <Card.Header>
          <Card.Title as="h2">Account settings</Card.Title>
          <Card.Description>Manage your profile and security preferences.</Card.Description>
        </Card.Header>
        <Card.Body>Open settings</Card.Body>
      </a>
    </Card>
  ),
};