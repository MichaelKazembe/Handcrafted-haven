import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  nextPlugin.configs["core-web-vitals"], // Next.js recommended config
  {
    rules: {
      // Example custom rules
      "react/react-in-jsx-scope": "off", // Next.js handles React import
      "@next/next/no-img-element": "warn",
    },
  },
];