module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 100],
    'subject-case': [0],
    'type-enum': [0],
    'type-empty': [0],
    'subject-empty': [0],
    'header-full-stop': [0],
    'header-case': [0],
    'scope-empty': [0],
    'body-leading-blank': [0],
    'footer-leading-blank': [0],
    'header-pattern': [
      2,
      'always',
      /^TG-\d+ #(ready-for-test|done) (feat|fix|docs|style|refactor|perf|test|chore|revert): .+$/
    ],
  },
};
