import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';
import { useState } from 'react';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'subtle', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    interactive: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    children: 'React 19',
    variant: 'subtle',
    size: 'md',
  },
};

export const Removable: Story = {
  args: {
    children: 'Design System',
    variant: 'outline',
  },
  render: (args) => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
      return (
        <button
          type="button"
          onClick={() => setIsVisible(true)}
          className="text-xs text-accent underline cursor-pointer"
        >
          Reset Tag
        </button>
      );
    }

    return (
      <Tag
        {...args}
        onRemove={(e) => {
          args.onRemove?.(e);
          setIsVisible(false);
        }}
      />
    );
  },
};

export const AsLink: Story = {
  args: {
    asChild: true,
    variant: 'solid',
    children: <a href="https://github.com">GitHub</a>,
  },
};