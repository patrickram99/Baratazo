module.exports = {
  'backend/**/*.{js,ts}': ['eslint --fix --config backend/.eslintrc.json', 'prettier --write'],
  'frontend/**/*.{js,jsx,ts,tsx}': ['eslint --fix --config frontend/eslint.config.js', 'prettier --write'],
  '*.{json,md}': ['prettier --write'],
};
