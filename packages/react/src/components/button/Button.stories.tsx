import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
    },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Confirmar Ação',
    variant: 'solid',
    size: 'md',
  },
};

export const AsLink: Story = {
  args: {
    asChild: true,
    children: <a href="https://github.com/sirleyalmeida/mosaic" target="_blank" rel="noreferrer">Acessar Repositório</a>,
    variant: 'outline',
  },
};

export const LoadingState: Story = {
  args: {
    children: 'Salvando alterações',
    isLoading: true,
    variant: 'solid',
  },
};