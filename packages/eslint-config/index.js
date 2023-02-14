module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended'],

  settings: {
    react: {
      version: '17.0',
    },
  },

  rules: {
    'prettier/prettier': 'error',
    'import/no-anonymous-default-export': 'off',
    'import/no-extraneous-dependencies': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '~/**',
            group: 'internal',
          },
        ],
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
      },
    ],
    'react-hooks/exhaustive-deps': 'error',
  },
};
