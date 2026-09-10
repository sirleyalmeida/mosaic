import { ComponentProps, ReactNode, forwardRef } from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const dividerVariants = cva('shrink-0 bg-border-default transition-colors', {
  variants: {
    orientation: {
      horizontal: 'h-[1px] w-full',
      vertical: 'h-full w-[1px]',
    },
    variant: {
      default: 'bg-border-default',
      subtle: 'bg-surface-soft',
      accent: 'bg-accent',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'default',
  },
});

type DividerSeparatorProps = Omit<
  ComponentProps<typeof SeparatorPrimitive.Root>,
  'orientation'
>;

export interface DividerProps
  extends DividerSeparatorProps,
    VariantProps<typeof dividerVariants> {
  label?: ReactNode;
  children?: ReactNode;
}

export const Divider = forwardRef<
  HTMLDivElement,
  DividerProps
>(
  (
    {
      className,
      orientation = 'horizontal',
      variant,
      decorative = true,
      label,
      children,
      ...props
    },
    ref
  ) => {
    const content = label ?? children;
    const resolvedOrientation = orientation ?? 'horizontal';

    if (content != null && resolvedOrientation === 'vertical') {
      throw new Error('Divider labels are only supported with horizontal orientation.');
    }

    if (content != null) {
      return (
        <div
          ref={ref}
          role="none"
          className={cn('flex items-center w-full gap-gap-grid', className)}
          {...props}
        >
          <SeparatorPrimitive.Root
            decorative={decorative}
            orientation="horizontal"
            className={cn(dividerVariants({ orientation: 'horizontal', variant }), 'flex-1')}
          />
          <span className="text-xs font-medium text-text-tertiary whitespace-nowrap uppercase tracking-wider shrink-0">
            {content}
          </span>
          <SeparatorPrimitive.Root
            decorative={decorative}
            orientation="horizontal"
            className={cn(dividerVariants({ orientation: 'horizontal', variant }), 'flex-1')}
          />
        </div>
      );
    }

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={resolvedOrientation}
        aria-orientation={decorative ? undefined : resolvedOrientation}
        className={cn(dividerVariants({ orientation: resolvedOrientation, variant, className }))}
        {...props}
      />
    );
  }
);

Divider.displayName = 'Divider';