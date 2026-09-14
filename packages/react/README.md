 # @mosaic-ds/react

Accessible React components for the Mosaic Design System, with typed APIs, generated design tokens, and composable Radix UI primitives.

## Installation

```bash
npm install @mosaic-ds/react react react-dom
```

`@mosaic-ds/react` requires React 19 and React DOM 19.

## Setup

Import the package stylesheet once in your application entry point:

```tsx
import '@mosaic-ds/react/styles.css';
```

Wrap your application with `MosaicProvider` to apply the base layout and text styles. Set `dir="rtl"` for right-to-left interfaces.

```tsx
import { MosaicProvider } from '@mosaic-ds/react';

export function App() {
	return (
		<MosaicProvider>
			{/* Your application */}
		</MosaicProvider>
	);
}
```

## Usage

```tsx
import { Button, Card } from '@mosaic-ds/react';

export function AccountCard() {
	return (
		<Card>
			<Card.Header>
				<Card.Title>Account settings</Card.Title>
				<Card.Description>Manage your profile and preferences.</Card.Description>
			</Card.Header>
			<Card.Body>Your account is ready to configure.</Card.Body>
			<Card.Footer>
				<Button variant="outline" size="sm">Cancel</Button>
				<Button size="sm">Save changes</Button>
			</Card.Footer>
		</Card>
	);
}
```

### Modal

`Modal` is controlled through `isOpen` and `onClose`:

```tsx
import { useState } from 'react';
import { Button, Modal } from '@mosaic-ds/react';

export function SettingsDialog() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setIsOpen(true)}>Open settings</Button>
			<Modal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				title="Account settings"
			>
				<p>Update your profile and security preferences.</p>
			</Modal>
		</>
	);
}
```

## Components

- `Button`: solid, outline, ghost, and danger variants; sizes; icons; loading; full-width layout; and `asChild` composition.
- `Card`: compound layout with `Header`, `Title`, `Description`, `Body`, and `Footer` subcomponents.
- `Modal`: accessible controlled dialog built on Radix UI.
- `Tag`: styled labels with optional icons, interaction, and removal actions.
- `Divider`: horizontal or vertical separators with optional labels.
- `Skeleton`: text, circular, and rectangular loading placeholders.
- `Spinner`: loading indicator with size and label options.

All components expose TypeScript props and accept standard DOM props where appropriate.

## Theming

Use `applyMosaicTheme` to override supported design tokens at runtime:

```tsx
import { applyMosaicTheme } from '@mosaic-ds/react';

applyMosaicTheme({
	accent: '#10b981',
	'bg-card': '#0f172a',
	'radius-card': '12px',
});
```

Supported token keys include `bg-primary`, `bg-secondary`, `bg-card`, `text-primary`, `text-secondary`, `border-default`, `accent`, `surface-soft`, `surface-strong`, `radius-card`, `gap-card`, and `gap-grid`.

## Accessibility

Interactive components use accessible Radix UI primitives and keyboard-friendly states. Provide meaningful labels for icon-only controls and use visible text that describes the action or content.

## Exports

The package exports `Button`, `Card`, `Modal`, `Tag`, `Divider`, `Skeleton`, `Spinner`, `MosaicProvider`, `applyMosaicTheme`, and their related TypeScript types.

Styles are available from the `@mosaic-ds/react/styles.css` subpath.

## License

MIT © Sirley Almeida

For Storybook documentation and contribution guidelines, visit the [Mosaic repository](https://github.com/sirleyalmeida/mosaic).
