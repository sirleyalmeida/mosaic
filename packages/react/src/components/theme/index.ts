export interface MosaicThemeTokens {
  'bg-primary'?: string;
  'bg-secondary'?: string;
  "bg-light"?: string;
  'bg-card'?: string;
  'text-primary'?: string;
  'text-secondary'?: string;
  'text-tertiary'?: string;
  'border-default'?: string;
  'accent'?: string;
  'surface-soft'?: string;
  'surface-strong'?: string;
  'radius-card'?: string;
  'gap-card'?: string;
  'gap-grid'?: string;
}

const variableMap: Record<keyof MosaicThemeTokens, string> = {
  'bg-primary': '--mosaic-color-bg-primary',
  'bg-secondary': '--mosaic-color-bg-secondary',
  'bg-light': '--mosaic-color-bg-light',
  'bg-card': '--mosaic-color-bg-card',
  'text-primary': '--mosaic-color-text-primary',
  'text-secondary': '--mosaic-color-text-secondary',
  'text-tertiary': '--mosaic-color-text-tertiary',
  'border-default': '--mosaic-color-border-default',
  'accent': '--mosaic-color-accent',
  'surface-soft': '--mosaic-color-surface-soft',
  'surface-strong': '--mosaic-color-surface-strong',
  'radius-card': '--mosaic-radius-card',
  'gap-card': '--mosaic-space-gap-card',
  'gap-grid': '--mosaic-space-gap-grid',
};

export function applyMosaicTheme(
  tokens: MosaicThemeTokens,
  target: HTMLElement = document.documentElement,
): void {
  Object.entries(tokens).forEach(([key, value]) => {
    if (value !== undefined) {
      target.style.setProperty(variableMap[key as keyof MosaicThemeTokens], value);
    }
  });
}