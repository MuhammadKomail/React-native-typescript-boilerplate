import globals from 'globals';
import js from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
    ignores: ['node_modules/**', 'dist/**', 'build/**', '.next/**'],
  },
];
