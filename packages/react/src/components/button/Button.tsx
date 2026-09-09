import { ComponentProps, MouseEvent, ReactNode, forwardRef } from 'react';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-gap-grid whitespace-nowrap rounded-md font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        solid: 'bg-accent text-bg-primary hover:opacity-90 active:opacity-100',
        outline: 'border border-border-default bg-transparent text-text-primary hover:bg-surface-soft active:bg-surface-strong',
        ghost: 'bg-transparent text-text-primary hover:bg-surface-soft hover:text-accent active:bg-surface-strong',
        danger: 'bg-danger text-danger-foreground hover:bg-danger-hover active:bg-danger-active focus-visible:ring-danger',
      },
      size: {
        sm: 'h-8 px-3 text-xs rounded-sm',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 text-base rounded-lg',
        icon: 'h-10 w-10 p-0 shrink-0',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? Slot : 'button';
    const isDisabled = disabled || isLoading;
    const childProps = asChild
      ? {
          'aria-disabled': isDisabled || undefined,
          'aria-busy': isLoading || undefined,
          onClick: (event: MouseEvent<HTMLElement>) => {
            if (isDisabled) {
              event.preventDefault();
              return;
            }

            onClick?.(event as MouseEvent<HTMLButtonElement>);
          },
        }
      : {
          disabled: isDisabled,
          'aria-busy': isLoading || undefined,
          onClick,
        };

    return (
      <Component
        ref={ref}
        {...childProps}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        {...props}
      >
        {isLoading && (
          <span className="inline-flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-current"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l-2.647z"
              />
            </svg>
            <span>{children}</span>
          </span>
        )}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        {!isLoading && (asChild ? <Slottable>{children}</Slottable> : children)}
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </Component>
    );
  }
);

Button.displayName = 'Button';