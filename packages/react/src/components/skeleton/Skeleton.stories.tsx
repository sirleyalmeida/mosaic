import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { Spinner } from '../spinner/Spinner';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Loading Primitives',
  component: Skeleton,
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-80 p-gap-card border border-border-default rounded-card bg-bg-card space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" width="60%" height={16} />
          <Skeleton variant="text" width="40%" height={12} />
        </div>
      </div>
      <Skeleton variant="rectangular" width="100%" height={120} />
      <div className="flex justify-between items-center pt-2">
        <Skeleton variant="text" width={80} height={24} />
        <Spinner size="sm" variant="accent" />
      </div>
    </div>
  ),
};