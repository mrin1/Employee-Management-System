# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

# Employee Management System

A high-performance, modern Employee Management System built with React, TypeScript, Tailwind CSS, and Yup validation, featuring persistent LocalStorage and a seamless Dark/Light theme toggle.

## Features

- **CRUD Operations**: Add, view, edit, and delete employee records effortlessly.
- **Data Persistence**: Automatic synchronization with browser LocalStorage so data remains intact across sessions.
- **Strict Form Validation**: Powered by Yup and custom touched-state handling to enforce proper email formatting and strict 10-digit phone constraints.
- **Real-Time Search**: Instant filtering across employee names, email addresses, and departments.
- **Dual Theme Support**: Switch instantly between an ultra-clean Light Mode and a matte-black Obsidian Dark Mode (Zinc design system).
- **Interactive Modals**: Secure confirmation dialog boxes before deleting any employee record.

## Tech Stack

- **Framework**: React 18 / TypeScript / Vite
- **Styling**: Tailwind CSS (Zinc & Slate palettes)
- **Validation**: Yup
- **Icons**: Lucide React

## Project Structure

```text
src/
├── components/
│   ├── EmployeeForm.tsx
│   ├── EmployeeTable.tsx
│   └── Navbar.tsx
├── pages/
│   └── Dashboard.tsx
├── typescript/
│   ├── interface/
│   │   └── employee.ts
│   └── types/
│       └── index.ts
├── validation/
│   └── validation.ts
├── App.tsx
└── main.tsx

1.Getting Started
2.Extract the project archive.

Install dependencies:

Bash
npm install
3.Run the development server:

Bash
npm run dev
```
