import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  // Ignore junk
  {
    ignores: ["dist/**", "build/**", "node_modules/**"],
  },

  // Base JS sanity
  js.configs.recommended,

  // React + JSX
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // Keep signal, kill noise
      "no-unused-vars": "warn",
      "no-console": "off",

      // React modern defaults
      "react/react-in-jsx-scope": "off",

      // Hooks correctness (important)
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];
