import globals from "globals";
import pluginJs from "@eslint/js";
import js from '@eslint/js';
import stylisticJs from '@stylistic/eslint-plugin-js';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    ignores: ['node_modules/', 'dist/'],
  },
  js.configs.recommended,
  {
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    languageOptions: { 
      globals: globals.browser 
    },
    rules: {
      '@stylistic/js/indent': [
        'error',
        2
      ],
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/js/quotes': [
        'error',
        'single'
      ],
      '@stylistic/js/semi': [
        'error',
        'always'
      ],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', { 'before': true, 'after': true },
      ],
      'no-console': 'off',
    },
  },
  pluginJs.configs.recommended
];
