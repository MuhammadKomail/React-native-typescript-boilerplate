module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:jest/recommended',
    '@react-native',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:prettier/recommended',
  ],
  plugins: ['jest', '@typescript-eslint', 'react', 'react-native', 'prettier'],
  parserOptions: {
    ecmaFeatures: {jsx: true},
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    'react-native/react-native': true,
    jest: true,
    node: true,
    browser: true,
  },
  rules: {
    'prettier/prettier': ['error', {semi: true}],
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
    'no-unused-vars': 'off',
    quotes: [2, 'single', {avoidEscape: true}],
    'react-native/split-platform-components': 'off',
    'react-native/no-raw-text': 'off',
    'react-native/no-single-element-style-arrays': 'off',
    'react-native/no-inline-styles': 'off',
    'react-native/no-color-literals': 'off',
    'react-native/no-unused-styles': 'off',
    'react-native/sort-styles': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-require-imports': 'off',
    'import/no-unresolved': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react/no-unstable-nested-components': 'off',
  },
  settings: {
    react: {version: 'detect'},
  },
};
