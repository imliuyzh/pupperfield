import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import importPlugin from "eslint-plugin-import";
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
      "src/app/Provider.tsx",
      "src/components/ui/*",
      "src/lib/utils.ts",
    ]
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript
    ],
    settings: {
      "import/resolver": {
        "typescript": true,
        "node": true,
      },
    },
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
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": "error",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
      "import/no-cycle": "error",
      "import/no-restricted-paths": ["error", {
        "zones": [
          {
            target: "./src/features/Auth",
            from: "./src/features",
            except: ["./Auth"],
          },
          {
            target: "./src/features/Favorites",
            from: "./src/features",
            except: ["./Favorites"],
          },
          {
            target: "./src/features/Search",
            from: "./src/features",
            except: ["./Search"],
          },
          {
            target: "./src/features",
            from: "./src/app",
          },
          {
            target: [
              "./src/components",
              "./src/lib",
              "./src/types",
              "./src/utils",
            ],
            from: ["./src/app", "./src/features"],
          },
        ]
      }],
      "react/react-in-jsx-scope": "off",
    },
  },
);