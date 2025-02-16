// @ts-check

import tseslint from 'typescript-eslint';
// @ts-ignore
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
// @ts-ignore
import * as eslintrc from '@eslint/eslintrc';

export default tseslint.config({
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    unicorn: eslintPluginUnicorn,
  },
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: true,
    },
  },
  files: ['**/*.ts'],
  rules: {
    "unicorn/better-regex": "error",
    "@typescript-eslint/semi": "error",
    "@typescript-eslint/no-var-requires": "error"
    // '@typescript-eslint/no-unsafe-argument': 'error',
    // '@typescript-eslint/no-unsafe-assignment': 'error',
    // '@typescript-eslint/no-unsafe-call': 'error',
    // '@typescript-eslint/no-unsafe-member-access': 'error',
    // '@typescript-eslint/no-unsafe-return': 'error',
  },
});