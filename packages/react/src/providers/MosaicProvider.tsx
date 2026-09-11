import { ReactNode } from 'react';
import { DirectionProvider } from '@radix-ui/react-direction';

export interface MosaicProviderProps {
  children: ReactNode;
  dir?: 'ltr' | 'rtl';
}

export function MosaicProvider({ children, dir = 'ltr' }: MosaicProviderProps) {
  return (
    <DirectionProvider dir={dir}>
      <div dir={dir} className="bg-bg-primary text-text-primary min-h-full">
        {children}
      </div>
    </DirectionProvider>
  );
}