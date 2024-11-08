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
      globals: {
        ...globals.browser,
        ...globals.node, // Adding Node.js global variables
        ...globals.jest  // Adding Jest global variables
      }
    },
    
    rules: {
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],
      'eqeqeq': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'no-console': 'off',
      "arrow-spacing": ["error", { "before": true, "after": true }],
    },
  },
  pluginJs.configs.recommended
];
