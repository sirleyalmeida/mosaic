import StyleDictionary from 'style-dictionary';

const kebabCase = (value) => value
  .replace(/([a-z])([A-Z])/g, '$1-$2')
  .replace(/\s+/g, '-')
  .toLowerCase();

StyleDictionary.registerFormat({
  name: 'css/theme-variables',
  format: ({ dictionary }) => {
    const declarations = dictionary.allTokens
      .map((token) => {
        const variableName = token.path
          .filter((part) => part !== 'mosaic' && part !== 'theme' && part !== 'light')
          .map(kebabCase)
          .join('-');

        return `  --mosaic-${variableName}: ${token.value};`;
      })
      .join('\n');

    return `[data-theme="light"] {\n${declarations}\n}\n`;
  },
});

const styleDictionary = new StyleDictionary({
  source: ['src/tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
          filter: (token) => token.path[1] !== 'theme',
        },
        {
          destination: 'theme-light.css',
          format: 'css/theme-variables',
          filter: (token) => token.path[1] === 'theme' && token.path[2] === 'light',
        },
      ],
    },
    json: {
      transformGroup: 'js',
      buildPath: 'dist/json/',
      files: [
        {
          destination: 'tokens.json',
          format: 'json/flat',
        },
      ],
    },
  },
});

await styleDictionary.buildAllPlatforms();