import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta: Meta<typeof Spinner> = {
	title: 'Components/Loading Primitives/Spinner',
	component: Spinner,
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg', 'xl'],
		},
		variant: {
			control: 'select',
			options: ['default', 'accent', 'subtle'],
		},
		animated: { control: 'boolean' },
		decorative: { control: 'boolean' },
		label: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
	args: {
		label: 'Loading content',
	},
};

export const Sizes: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Spinner size="sm" label="Loading small" />
			<Spinner size="md" label="Loading medium" />
			<Spinner size="lg" label="Loading large" />
			<Spinner size="xl" label="Loading extra large" />
		</div>
	),
};

export const Variants: Story = {
	render: () => (
		<div className="flex items-center gap-4">
			<Spinner variant="default" label="Loading default" />
			<Spinner variant="accent" label="Loading accent" />
			<Spinner variant="subtle" label="Loading subtle" />
		</div>
	),
};

export const Decorative: Story = {
	render: () => (
		<button type="button" className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-bg-primary">
			<Spinner size="sm" decorative />
			Saving changes
		</button>
	),
};
