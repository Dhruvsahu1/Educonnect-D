import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "coverage/**",
    ],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,

      // Practical backend rules
      "no-console": "off",              // backend logs are fine
      "no-process-exit": "off",
      "no-unused-vars": ["warn", {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      }],

      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],

      // Safety
      "no-eval": "error",
      "no-implied-eval": "error",
    },
  },
];

