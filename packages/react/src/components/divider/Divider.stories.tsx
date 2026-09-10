import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['default', 'subtle', 'accent'],
    },
    decorative: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md p-4 text-text-primary">
      <p className="text-sm">Content Above</p>
      <Divider className="my-4" />
      <p className="text-sm">Content Below</p>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="w-full max-w-md p-4">
      <Divider label="OR CONTINUE WITH" />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center h-8 gap-4 text-sm text-text-primary">
      <span>Feed</span>
      <Divider orientation="vertical" />
      <span>Settings</span>
      <Divider orientation="vertical" />
      <span>Profile</span>
    </div>
  ),
};