import { ComponentProps, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const skeletonVariants = cva('bg-surface-strong/40 shrink-0', {
  variants: {
    variant: {
      text: 'h-4 w-full rounded-xs',
      circular: 'rounded-full',
      rectangular: 'rounded-md',
    },
    animated: {
      true: 'motion-safe:animate-pulse',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'text',
    animated: true,
  },
});

export interface SkeletonProps
  extends ComponentProps<'div'>,
    VariantProps<typeof skeletonVariants> {
  width?: string | number;
  height?: string | number;
  animated?: boolean;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, animated, width, height, style, ...props }, ref) => {
    const resolvedVariant = variant ?? 'text';
    const defaultDimensions =
      resolvedVariant === 'circular'
        ? { width: '40px', height: '40px' }
        : resolvedVariant === 'rectangular'
          ? { width: '100%', height: '120px' }
          : {};
    const customStyle = {
      ...defaultDimensions,
      width: typeof width === 'number' ? `${width}px` : width ?? defaultDimensions.width,
      height: typeof height === 'number' ? `${height}px` : height ?? defaultDimensions.height,
      ...style,
    };

    return (
      <div
        ref={ref}
        style={customStyle}
        className={cn(skeletonVariants({ variant: resolvedVariant, animated, className }))}
        {...props}
        aria-hidden="true"
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';