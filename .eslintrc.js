/**
 * @type {import('eslint-define-config').EslintConfig}
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: [
    'react',
    'jsx-a11y',
    'react-hooks',
    '@typescript-eslint',
    'eslint-plugin-simple-import-sort',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:json/recommended',
    'plugin:react/jsx-runtime',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // ts will check these rule
    'no-undef': 'off',
    'no-unused-vars': 'off',

    // replace 'no-redeclare' with @typescript-eslint
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': ['error'],

    // note you must disable the base rule as it can report incorrect errors
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],

    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
  },
};
