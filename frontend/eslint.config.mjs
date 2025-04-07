import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintJs from "@eslint/js"; // Import recommended rules
import tseslint from "typescript-eslint"; // Import TS plugin/parser
import eslintPluginReact from "eslint-plugin-react"; // Import React plugin
import eslintConfigNext from "eslint-config-next"; // Import Next.js specific config

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// FlatCompat for extending older eslintrc-style configs if needed (like next/core-web-vitals)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  // resolvePluginsRelativeTo: __dirname, // might be needed depending on setup
});

const eslintConfig = [
  // Base ESLint recommended rules
  eslintJs.configs.recommended,

  // TypeScript specific rules using the new flat config structure
  ...tseslint.configs.recommended, // Or recommendedTypeChecked if using type info

  // React specific rules (new flat config structure)
  {
    plugins: {
      react: eslintPluginReact,
    },
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReact.configs["jsx-runtime"].rules, // Recommended for React 17+ JSX transform
      "react/prop-types": "off", // Not needed with TypeScript
      // Add other React specific rules here
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
  },

  // Next.js specific rules using FlatCompat for `eslint-config-next`
  // This often includes rules for react-hooks, jsx-a11y etc.
  ...compat.extends("next/core-web-vitals"),

  // Custom rules or overrides
  {
    rules: {
      // Example: Enforce no console logs in production (modify as needed)
      // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Warn on unused vars except those starting with _
      "@typescript-eslint/no-explicit-any": "warn", // Warn against using 'any'
      // Add more custom rules here
    },
    // Target specific files if necessary
    // files: ["src/**/*.{ts,tsx}"],
  },

  // Ignore files if needed (e.g., generated files)
  {
    ignores: [
      ".next/",
      "node_modules/",
      "out/",
      "build/",
      // Add other ignored paths
    ],
  },
];

export default eslintConfig;
