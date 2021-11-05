/* eslint-disable no-undef */
module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'plugin:react/recommended',
    'google',
    'plugin:import/errors',
    'plugin:import/warnings',
    'eslint:all',
    'plugin:react/all',
  ],
  'parser': '@babel/eslint-parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
      'tsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    'react-hooks',
    'import',
    'sort-keys-fix',
  ],
  'rules': {
    'array-bracket-newline': [
      'error',
      {
        'minItems': 4,
        'multiline': true,
      },
    ],
    'array-element-newline': [
      'error',
      {
        'minItems': 3,
        'multiline': true,
      },
    ],
    'func-style': [
      'error',
      'declaration',
      {'allowArrowFunctions': true},
    ],
    'function-call-argument-newline': 'off',
    'import/no-unresolved': 'off',
    'import/order': [
      'error',
      {
        'alphabetize': {
          'caseInsensitive': true,
          'order': 'asc',
        },
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          ['index', 'sibling'],
          'object',
        ],
        'newlines-between': 'always',
        'pathGroups': [
          {
            'group': 'external',
            'pattern': 'react',
            'position': 'before',
          },
        ],
        'pathGroupsExcludedImportTypes': ['react'],
      },
    ],
    'indent': 'off',
    'max-len': [
      'error',
      {
        'code': 120,
      },
    ],
    'max-lines-per-function': ['off'],
    'no-extra-parens': ['off'],
    'no-magic-numbers': ['off', {'detectObjects': true}],
    'no-ternary': ['off'],
    'no-use-before-define': 'off',
    'quote-props': ['error', 'always'],
    'quotes': [
      2,
      'single',
      {
        'avoidEscape': true,
      },
    ],
    'react/forbid-component-props': ['off'],
    'react/function-component-definition': ['off'],
    'react/jsx-filename-extension': [
      1,
      {
        'extensions': [
          '.ts',
          '.tsx',
          '.js',
          'jsx',
        ],
      },
    ],
    'react/jsx-first-prop-new-line': ['warn', 'multiline'],
    'react/jsx-max-depth': ['off'],
    'react/jsx-no-bind': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'react/jsx-sort-props': [
      'warn',
      {
        'callbacksLast': true,
        'ignoreCase': false,
        'noSortAlphabetically': false,
        'shorthandFirst': true,
        'shorthandLast': true,
      },
    ],
    'react/jsx-wrap-multilines': ['off'],
    'react/no-multi-comp': 'off',
    'react/no-unstable-nested-components': ['off'],
    'react/prop-types': ['off'],
    'react/react-in-jsx-scope': 'off',
    'require-jsdoc': 'off',
    'semi': 'off',
    'sort-imports': [
      'off',
      {
        'memberSyntaxSortOrder': [
          'all',
          'single',
          'multiple',
          'none',
        ],
      },
    ],
    'sort-keys': [
      'error',
      'asc',
      {
        'caseSensitive': false,
      },
    ],
    'sort-keys-fix/sort-keys-fix': [1],
    'valid-jsdoc': ['off'],
  },
  'settings': {
    'import/resolver': {
      'node': {
        'extensions': ['.ts', '.tsx'],
      },
    },
  },
};
