module.exports = {
    "env": {
      "browser": true,
    },
    "extends": [
      "plugin:react/recommended",
      "google",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:import/typescript"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "project": "./tsconfig.json",
      "ecmaFeatures": {
        "jsx": true,
        "tsx": true
      },
      "ecmaVersion": 12,
      "sourceType": "module"
    },
    "plugins": [
      "react",
      "@typescript-eslint",
      "react-hooks",
      "import",
      "sort-keys-fix"
    ],
    "settings": {
      "import/resolver": {
        "node": {
          "extensions": [
            ".ts",
            ".tsx"
          ]
        }
      }
    },
    "rules": {
      "sort-keys-fix/sort-keys-fix": [1],
      "indent": "off",
      "quote-props": [
        "error",
        "always"
      ],
      "sort-keys": [
        "error",
        "asc",
        {
          "caseSensitive": false
        }
      ],
      "quotes": [
        2,
        "single",
        {
          "avoidEscape": true
        }
      ],
      "react/react-in-jsx-scope": "off",
      "import/no-unresolved": "off",
      "react/jsx-filename-extension": [
        1,
        {
          "extensions": [
            ".ts",
            ".tsx"
          ]
        }
      ],
      "max-len": [
        "error",
        {
          "code": 120
        }
      ],
      "react/jsx-sort-props": [
        "warn",
        {
          "callbacksLast": true,
          "shorthandFirst": true,
          "shorthandLast": true,
          "ignoreCase": false,
          "noSortAlphabetically": false
        }
      ],
      "react/jsx-first-prop-new-line": [
        "warn",
        "multiline"
      ],
      "array-element-newline": [
        "warn",
        {
          "multiline": true
        }
      ],
      "import/namespace":"off",
      "import/order": [
        "error",
        {
          "groups": [
            "builtin",
            "external",
            "internal",
            "parent",
            [
              "index",
              "sibling"
            ],
            "object"
          ],
          "newlines-between": "always",
          "pathGroups": [
            {
              "pattern": "react",
              "group": "external",
              "position": "before"
            }
          ],
          "pathGroupsExcludedImportTypes": [
            "react"
          ],
          "alphabetize": {
            "order": "asc",
            "caseInsensitive": true
          }
        }
      ]
    }
  };
