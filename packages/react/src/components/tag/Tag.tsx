import { ComponentProps, KeyboardEvent, MouseEvent, ReactNode, forwardRef } from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const tagVariants = cva(
  'inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        solid: 'bg-accent text-bg-primary',
        outline: 'border border-border-default bg-transparent text-text-primary',
        subtle: 'bg-surface-soft text-text-primary border border-transparent',
        ghost: 'bg-transparent text-text-primary hover:bg-surface-soft',
        danger: 'bg-danger/10 border border-danger/20 text-danger-foreground',
      },
      size: {
        sm: 'h-6 px-2 text-xs rounded-sm',
        md: 'h-7 px-2.5 text-xs rounded-md',
        lg: 'h-8 px-3 text-sm rounded-md',
      },
      interactive: {
        true: 'cursor-pointer hover:opacity-90 active:opacity-100',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'subtle',
      size: 'md',
      interactive: false,
    },
  }
);

export interface TagProps
  extends ComponentProps<'span'>,
    VariantProps<typeof tagVariants> {
  asChild?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onRemove?: (event: MouseEvent<HTMLButtonElement>) => void;
  removeButtonAriaLabel?: string;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      className,
      variant,
      size,
      interactive,
      asChild = false,
      leftIcon,
      rightIcon,
      onRemove,
      removeButtonAriaLabel = 'Remover tag',
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    if (asChild && onRemove) {
      throw new Error('Tag cannot combine asChild with onRemove. Render the remove action outside the slotted element.');
    }

    const Component = asChild ? Slot : 'span';
    const isInteractive = Boolean(onClick);

    const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onRemove?.(event);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
      if (!onClick || (event.key !== 'Enter' && event.key !== ' ')) {
        return;
      }

      event.preventDefault();
      onClick(event as unknown as MouseEvent<HTMLElement>);
    };

    return (
      <Component
        ref={ref}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role={onClick && !asChild ? 'button' : undefined}
        tabIndex={onClick && !asChild ? 0 : undefined}
        className={cn(
          tagVariants({
            variant,
            size,
            interactive: isInteractive,
            className,
          })
        )}
        {...props}
      >
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        
        {asChild ? <Slottable>{children}</Slottable> : <span>{children}</span>}
        
        {rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}

        {onRemove && (
          <button
            type="button"
            onClick={handleRemove}
            aria-label={removeButtonAriaLabel}
            className="inline-flex shrink-0 items-center justify-center rounded-xs p-0.5 text-current hover:bg-black/10 dark:hover:bg-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent cursor-pointer transition-colors"
          >
            <svg
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </Component>
    );
  }
);

Tag.displayName = 'Tag';