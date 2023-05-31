module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime"
  ],
  "overrides": [
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "import",
    "react"
  ],
  "rules": {
    "import/order": [
      "error",
      {
        "alphabetize": {
          "caseInsensitive": true,
          "order": "asc"
        },
        "groups": [
          "external",
          "builtin",
          "internal",
          "sibling",
          "parent",
          "index"
        ],
        "newlines-between": "always"
      }
    ],
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "max-len": [
      "warn",
      {
        code: 120
      }
    ],
    "no-case-declarations": "off",
    "no-fallthrough": "off",
    "no-prototype-builtins": "warn",
    "react/display-name": "off",
    "react/jsx-curly-brace-presence": [
      "error",
      {
        "props": "never",
        "children": "never"
      }
    ],
    "react/jsx-sort-props": [
      "error",
      {
        "reservedFirst": true,
        "noSortAlphabetically": true
      }
    ],
    "react/no-array-index-key": "warn",
    "react/prop-types": "off",
    "react-hooks/exhaustive-deps": "off",
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
};
