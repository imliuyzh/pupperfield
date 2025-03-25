import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  reactPlugin.configs.flat.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    ignores: [
      "dist",
      "eslint.config.js",
      "node_modules",
      "src/components/ThemeProvider/*",
      "src/components/ui/*",
      "src/lib/utils.ts",
    ]
  },
  {
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    plugins: {
      "@stylistic": stylistic,
      "react": reactPlugin,
    },
    settings: {
      "react": {
        "version": "detect"
      }
    },
  },
  {
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/semi": "error",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
);