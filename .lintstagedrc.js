module.exports = {
  'backend/**/*.{js,ts}': ['eslint --fix --config backend/.eslintrc.js', 'prettier --write'],
  'frontend/**/*.{js,jsx,ts,tsx}': ['eslint --fix --config frontend/.eslintrc.js', 'prettier --write'],
  '*.{json,md}': ['prettier --write'],
};
