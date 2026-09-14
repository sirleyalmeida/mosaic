# Mosaic Design System

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06b6d4?logo=tailwindcss)](https://tailwindcss.com/)
[![Storybook](https://img.shields.io/badge/Storybook-8-ff4785?logo=storybook)](https://storybook.js.org/)

Mosaic is an open source React design system built around accessible primitives, generated design tokens, typed component APIs, and automated visual regression testing.

## Current scope

The library currently includes:

- `@mosaic-ds/react`: Typed React components such as `Button`, `Card`, `Modal`, `Tag`, `Divider`, `Skeleton`, and `Spinner`.
- `@mosaic-ds/tokens`: Style Dictionary source tokens with generated CSS and JSON artifacts.
- Storybook: component documentation, controls, interaction stories, and light/dark previews.
- Automated tests: Vitest, React Testing Library, `jest-axe`, and Playwright screenshots.

The project is intentionally small while its component and quality foundations are being established.

## Architecture

```text
mosaic/
├── apps/
│   └── storybook/       # Component playground and documentation
├── packages/
│   ├── react/           # @mosaic-ds/react component library
│   └── tokens/          # @mosaic-ds/tokens and Style Dictionary pipeline
├── tests/
│   └── visual/          # Playwright visual regression tests
└── .github/workflows/   # CI workflows
```

| Technology | Role |
| --- | --- |
| React 19 | Component runtime |
| TypeScript | Strict typing and public API declarations |
| Radix UI | Accessible, unstyled interaction primitives |
| Tailwind CSS v4 | Utility styling and token aliases |
| Style Dictionary | Design token generation |
| Storybook 8 | Documentation, controls, and interaction stories |
| Vitest and Testing Library | Unit and integration tests |
| axe-core and jest-axe | Automated accessibility assertions |
| Playwright | Visual regression testing |
| pnpm workspaces | Monorepo dependency management |

## Getting started

### Prerequisites

- Node.js 22.14.0 or newer
- pnpm 12.3.4

Install dependencies:

```bash
git clone https://github.com/sirleyalmeida/mosaic.git
cd mosaic
pnpm install
```

### Local development

Start Storybook:

```bash
pnpm storybook
```

Storybook is available at `http://localhost:6006`.

The Storybook package builds the token artifacts before starting, so changes in `packages/tokens/src/tokens.json` are reflected in the preview.

## Component usage

Install the published packages in an application with:

```bash
npm install @mosaic-ds/react @mosaic-ds/tokens react react-dom
```

The public React package exports `Button`, `Card`, `Modal`, `Tag`, `Divider`, `Skeleton`, `Spinner`, `MosaicProvider`, `applyMosaicTheme`, and their related types.

```tsx
import '@mosaic-ds/react/styles.css';

import { useState } from 'react';
import { Button, Modal } from '@mosaic-ds/react';

export function UserProfile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Open modal
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Account settings"
      >
        <p>Manage your profile settings and security preferences.</p>
      </Modal>
    </div>
  );
}
```

`Button` supports typed variants, sizes, icons, loading state, full-width layout, and Radix `Slot` composition through `asChild`.

## Design tokens and themes

The source of truth is [`packages/tokens/src/tokens.json`](packages/tokens/src/tokens.json). Style Dictionary generates:

- `dist/css/variables.css`: default semantic tokens.
- `dist/css/theme-light.css`: light-theme overrides under `[data-theme="light"]`.
- `dist/json/tokens.json`: flattened token values.

Build the token artifacts explicitly when working with the token package:

```bash
pnpm --filter @mosaic-ds/tokens build
```

Install `@mosaic-ds/tokens` from npm before importing its CSS exports:

```css
@import "@mosaic-ds/tokens/css";
@import "@mosaic-ds/tokens/css/light";
```

When contributing to this repository, regenerate the token artifacts with:

```bash
pnpm --filter @mosaic-ds/tokens build
```

The generated variables use names such as:

```css
:root {
  --mosaic-color-bg-primary: #09090b;
  --mosaic-color-accent: #3b82f6;
}

[data-theme="light"] {
  --mosaic-color-bg-primary: #ffffff;
  --mosaic-color-accent: #2563eb;
}
```

Runtime overrides are available through the public theme API:

```tsx
import { applyMosaicTheme } from '@mosaic-ds/react';

applyMosaicTheme({
  accent: '#10b981',
  'bg-card': '#0f172a',
  'radius-card': '12px',
});
```

The API accepts friendly token names and maps them to the generated CSS variables. For example, `accent` maps to `--mosaic-color-accent`.

## Quality checks

Run the standard checks from the repository root:

```bash
pnpm typecheck
pnpm test
pnpm --filter @mosaic-ds/tokens build
pnpm --filter @mosaic-ds/react build
```

The test suite covers component behavior, keyboard interaction, loading and `asChild` states, and axe accessibility assertions.

### Visual regression

Playwright tests run against a production Storybook build. Install Chromium once per machine:

```bash
pnpm exec playwright install chromium
```

Build the visual test target:

```bash
pnpm visual:build
```

Run visual assertions against the committed baselines:

```bash
pnpm visual:test
```

Intentionally update baselines only after reviewing the visual change:

```bash
pnpm visual:update
```

The current visual coverage includes the Modal in dark and light themes and an opened interactive state. Baselines are stored under `tests/visual/` and Playwright reports are ignored.

## CI

The visual regression workflow runs on pull requests and pushes to `main`. It installs the locked pnpm version, builds tokens and Storybook, installs Chromium, and runs the Playwright suite.

## Contributing

When adding or changing a component:

1. Keep the public API typed and accessible by default.
2. Add or update a Storybook story with controls for meaningful props.
3. Add focused Vitest and Testing Library coverage for behavior and keyboard interaction.
4. Add axe assertions for new interactive states.
5. Update visual baselines only when the visual change is intentional.
6. Run `pnpm typecheck`, `pnpm test`, and `pnpm visual:test` before opening a pull request.

## License

Mosaic is distributed under the MIT License. See [LICENSE](LICENSE) for details.
