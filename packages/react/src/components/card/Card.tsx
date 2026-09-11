import { ComponentProps, ElementType, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const cardVariants = cva(
  'bg-bg-card text-text-primary rounded-card border border-border-default transition-colors flex flex-col overflow-hidden',
  {
    variants: {
      variant: {
        default: 'shadow-sm',
        outline: 'shadow-none',
        interactive: 'hover:border-accent hover:shadow-md cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface CardProps
  extends ComponentProps<'div'>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  ({ asChild = false, className, variant, children, ...props }, ref) => {
    const Component = asChild ? Slot : 'div';

    if (asChild && variant !== 'interactive') {
      throw new Error('Card asChild requires the interactive variant.');
    }

    return (
      <Component
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
CardRoot.displayName = 'Card';

export interface CardHeaderProps extends ComponentProps<'div'> {}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-gap-card flex flex-col gap-1.5 pb-0', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'Card.Header';

export interface CardTitleProps extends ComponentProps<'h3'> {
  as?: Extract<ElementType, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ as: Heading = 'h3', className, ...props }, ref) => (
    <Heading
      ref={ref}
      className={cn('text-xl font-semibold tracking-tight text-text-primary', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'Card.Title';

export interface CardDescriptionProps extends ComponentProps<'p'> {}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-text-secondary', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'Card.Description';

export interface CardBodyProps extends ComponentProps<'div'> {}

const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-gap-card flex-1', className)}
      {...props}
    />
  )
);
CardBody.displayName = 'Card.Body';

export interface CardFooterProps extends ComponentProps<'div'> {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-gap-card pt-0 flex items-center justify-between gap-gap-grid', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'Card.Footer';

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Body: CardBody,
  Footer: CardFooter,
});