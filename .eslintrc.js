module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    'vue/max-attributes-per-line': ['error', {
      'singleline': 1,
      'multiline': {
        'max': 1,
        'allowFirstLine': true,
      },
    }],
    'vue/attributes-order': ['error', {
      'order': [
        'OTHER_ATTR',
        'EVENTS',
        'TWO_WAY_BINDING',
        'UNIQUE',
        'CONDITIONALS',
        'LIST_RENDERING',
        'CONTENT',
        'RENDER_MODIFIERS',
        'DEFINITION',
        'OTHER_DIRECTIVES',
        'GLOBAL',
      ],
      'alphabetical': false,
    }],
    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "never"
    }],
    'vue/attribute-hyphenation': 0,
  },
};