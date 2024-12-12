// ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";
//import js from "@eslint/js";
import ts from "typescript-eslint";
import { FlatCompat } from "@eslint/eslintrc";
import { fixupConfigRules } from "@eslint/compat";
import prettierConfigRecommended from "eslint-plugin-prettier/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,

  //recommendedConfig: js.configs.recommended,
  //allConfig: js.configs.all,
});

const patchedConfig = fixupConfigRules([
  ...compat.config({
    //ignores: [".next/*", "components/ui/**/*", "tailwind.config.ts", "*.mjs"],
    extends: ["next/core-web-vitals", "next/typescript"],
  }),
]);

const config = [
  ...patchedConfig,

  ts.configs.eslintRecommended,
  //...ts.configs.recommended,
  prettierConfigRecommended,
  // Add more flat configs here
  { ignores: [".next/*", "components/ui/**/*", "tailwind.config.ts", "*.mjs"] },
  {
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];

export default config;
