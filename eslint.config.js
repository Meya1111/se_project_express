import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import pluginImport from "eslint-plugin-import";
import globals from "globals";
export default [
  js.configs.recommended,
  prettier,
  {
    files: ["**/*.js"],
    plugins: { import: pluginImport },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    rules: {
      "no-underscore-dangle": ["error", { allow: ["_id"] }],
      "import/no-unresolved": "error",
      "import/order": ["error", { "newlines-between": "always" }],
    },
  },
];