module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 100],
    'subject-case': [0],
    'type-enum': [0], // Disable built-in type-enum check
    'scope-enum': [0], // Disable scope-enum check
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'scope-empty': [0], // Allow empty scope
    'subject-full-stop': [0],
    'type-case': [0], // Disable type-case check
    'scope-case': [0], // Disable scope-case check
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
    'custom-type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']]
  },
  plugins: [
    {
      rules: {
        'custom-type-enum': (parsed) => {
          const { type } = parsed;
          const validTypes = ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'];
          return [
            validTypes.includes(type),
            `type must be one of [${validTypes.join(', ')}]`
          ];
        }
      }
    }
  ],
  parserPreset: {
    parserOpts: {
      headerPattern: /^TG-(\d+) #(ready-for-test|done) (\w+): (.+)$/,
      headerCorrespondence: ['ticket', 'status', 'type', 'subject']
    }
  }
};
