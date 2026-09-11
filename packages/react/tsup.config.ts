import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: true,
  treeshake: true,
  external: ['react', 'react-dom'],
  banner: {
    js: "'use client';",
  },
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
});