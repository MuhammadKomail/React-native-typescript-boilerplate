module.exports = {
  '*.{js,jsx,ts,tsx}': [
    "eslint --fix --ignore-pattern '!*' ",
    'prettier --write',
  ],
  '*.{json,md}': ['prettier --write'],
};
