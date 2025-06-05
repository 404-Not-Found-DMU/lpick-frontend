import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  // .storybook/main.ts
  stories: ['../src/components/**/*.stories.@(ts|tsx)'],

  addons: [
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
   babel: async (options) => {
    return {
      ...options,
      plugins: ['babel-plugin-macros'],
    };
  },
};
export default config;
