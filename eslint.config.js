// @ts-check

import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    ignores: [
      "./src/components/ThemeProvider/*",
      "./src/components/ui/*",
      "node_modules/*",
      "dist",
    ]
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      '@stylistic': stylistic
    },
  },
  {
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/semi": "error",
      "@typescript-eslint/explicit-function-return-type": "warn",
    },
  },
);