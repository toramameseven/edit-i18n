// eslint.config.js
// @ts-check
// https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/configs/recommended.ts

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
//import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: "." //import.meta.dirname,
      },
    },
    "rules": {
      // Note: you must disable the base rule as it can report incorrect errors
      "semi": "off",
      "@typescript-eslint/semi": "error"
    },
    ignores:["*.js"]
  },
  
  //eslintConfigPrettier
);

