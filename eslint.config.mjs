import globals from "globals";
import js from "@eslint/js";

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
    // Add your ignore patterns here instead of using .eslintignore
    ignores: ['node_modules/**', 'dist/**', 'build/**', '.next/**'],
  },
];
