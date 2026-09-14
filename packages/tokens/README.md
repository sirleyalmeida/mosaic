# @mosaic-ds/tokens

Generated design tokens for the Mosaic Design System. The package provides semantic CSS variables, a light theme, and flattened JSON token data for web applications and component libraries.

## Installation

```bash
npm install @mosaic-ds/tokens
```

## CSS tokens

Import the base variables stylesheet in your application:

```css
@import "@mosaic-ds/tokens/css";
```

The default variables include colors, surfaces, borders, shadows, radii, and spacing values such as:

```css
:root {
	--mosaic-color-bg-primary: #09090b;
	--mosaic-color-accent: #3b82f6;
	--mosaic-radius-card: 16px;
	--mosaic-space-gap-grid: 16px;
}
```

## Light theme

Import the light theme stylesheet after the base variables:

```css
@import "@mosaic-ds/tokens/css";
@import "@mosaic-ds/tokens/css/light";
```

The light theme values are applied when an ancestor has `data-theme="light"`:

```html
<body data-theme="light">
	<main class="app">Your application</main>
</body>
```

The theme stylesheet overrides semantic variables such as `--mosaic-color-bg-primary`, `--mosaic-color-text-primary`, and `--mosaic-color-accent` within that scope.

## JSON tokens

Import the flattened token data when JavaScript or tooling needs the token values:

```ts
import tokens from '@mosaic-ds/tokens/json';

console.log(tokens['mosaic-color-accent']);
```

The JSON export is generated from the source token definitions and contains the complete token set, including base values and light-theme values.

## Public exports

| Export | Description |
| --- | --- |
| `@mosaic-ds/tokens/css` | Base semantic CSS variables |
| `@mosaic-ds/tokens/css/light` | Light theme overrides |
| `@mosaic-ds/tokens/json` | Flattened token values as JSON |

The package does not expose a root JavaScript import. Use one of the documented subpaths.

## Source and generation

The source of truth is `src/tokens.json`. The generated files are written to `dist/` during the package build:

- `dist/css/variables.css`
- `dist/css/theme-light.css`
- `dist/json/tokens.json`

To regenerate the artifacts in the repository:

```bash
pnpm --filter @mosaic-ds/tokens build
```

## License

MIT © Sirley Almeida

For the complete design system and contribution guidelines, visit the [Mosaic repository](https://github.com/sirleyalmeida/mosaic).
