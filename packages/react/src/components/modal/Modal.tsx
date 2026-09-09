import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => (
  <Dialog.Root open={isOpen} onOpenChange={onClose}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-[var(--shadow-soft,#090712)]/80 backdrop-blur-sm data-[state=open]:animate-fadeIn" />
      <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-card border border-border-default text-text-primary p-gap-card rounded-card shadow-xl w-full max-w-md focus:outline-none">
        <Dialog.Title className="text-xl font-semibold text-text-primary">
          {title}
        </Dialog.Title> 
        <Dialog.Description asChild>
          <div className="mt-gap-grid text-text-secondary">
          {children}
          </div>
        </Dialog.Description>
        <Dialog.Close 
          aria-label="Fechar" 
          className="absolute top-4 right-4 text-text-tertiary hover:text-accent focus:text-accent rounded-sm transition-colors focus:outline-none"
        >
          ✕
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);