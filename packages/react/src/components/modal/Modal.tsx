import * as Dialog from '@radix-ui/react-dialog';
import { ReactNode } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children, icon }: ModalProps) => (
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
          {icon || (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);