import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within, screen } from '@storybook/test';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
  },
};
export default meta;

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Acessibilidade Garantida',
    children: 'Este modal gerencia o foco automaticamente e fecha ao pressionar ESC.',
  },
};

export const Interactive: Story = {
  args: {
    title: 'Modal Interativo',
    children: 'Você pode abrir e fechar este modal clicando no botão ou pressionando ESC.',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-8 flex justify-center items-center">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-accent text-bg-primary font-semibold rounded-md hover:opacity-90 transition-opacity"
        >
          Abrir Modal
        </button>

        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
};


export const AutomatedInteraction: Story = {
  args: {
    title: 'Modal Interativo',
    children: 'Conteúdo testado de forma automatizada.',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="p-4">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-accent text-bg-primary rounded-md"
        >
          Abrir Modal
        </button>

        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const openButton = canvas.getByRole('button', { name: /abrir modal/i });
    await userEvent.click(openButton);
    const modalTitle = await screen.findByText('Modal Interativo');
    await expect(modalTitle).toBeInTheDocument();
  },
};