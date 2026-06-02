import { defineConfig, globalIgnores } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import eslintPluginPerfectionist from "eslint-plugin-perfectionist";
import nextTypescript from "eslint-config-next/typescript";

const ignorePatterns = ["eslint.config.mjs", "build/**"];

export default defineConfig(
  globalIgnores(ignorePatterns),
  ...nextTypescript,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@stylistic": stylistic,
      "@typescript-eslint": tseslint.plugin,
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  stylistic.configs.recommended,
  eslintPluginPerfectionist.configs["recommended-alphabetical"],
  {
    rules: {
      eqeqeq: "error",
      "no-console": "off",
      "no-else-return": "error",
      "perfectionist/sort-imports": [
        "error",
        {
          type: "natural",
          order: "asc",
          groups: ["side-effect", "external", "internal", "import"],
        },
      ],
      "@stylistic/arrow-parens": ["error", "as-needed"],
      "@stylistic/brace-style": ["error", "1tbs"],
      "@stylistic/quotes": ["error", "single"],
      "@stylistic/padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/require-await": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/explicit-function-return-type": ["error", {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      }],
    },
  }
);
