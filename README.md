# ITELECT4 Submission Tracker

A React and TypeScript frontend for managing courses and student submissions. The project contains the progressive graded-task work from GT1 Part 1 through GT3 Part 3.

## Features

- GT1 TypeScript foundations: strict typing, interfaces, aliases, unions, intersections, narrowing, generics, utility types, enums, and `ReturnType`
- GT2 typed React components, hooks, search/filtering, API requests, loading/error states, and JSON Server data
- GT3 React Router pages, authentication with protected submissions, TanStack Query queries and mutation, Zustand UI/auth state, and React Context with `useReducer`
- GT3 Part 3 forms using React Hook Form, Zod-derived types, `.refine()` validation, and Shadcn-style `Button`, `Input`, and `Label` components

## GT3 Part 3 Completion

The final frontend includes a typed submission form backed by the JSON Server mutation. Valid submissions are posted through TanStack Query and refresh the submissions query; invalid course and repository values show field-level Zod errors. The form uses `z.infer`, React Hook Form, and the shared Button, Input, and Label components.

## Installation

```bash
npm install
```

## Run the application

Start the API in one terminal:

```bash
npm run api
```

Start the frontend in another terminal:

```bash
npm run dev
```

The frontend runs on Vite's default port, usually http://localhost:5173/. The API runs on http://localhost:3001/.

## Verification

```bash
npx tsc --noEmit
npm run lint
npm run build
```

## Project structure

- `types/index.ts`: canonical GT1 shared types
- `src/index.ts`: GT1 demonstrations and examples
- `src/components/`: typed reusable components and UI primitives
- `src/pages/`: routed dashboard, courses, login, and submissions views
- `src/api/client.ts`: typed JSON Server queries and submission mutation
- `src/context/`: Context and reducer global state
- `src/hooks/`: reusable typed hooks
- `src/schemas/`: Zod validation schemas
- `src/store/`: persisted authentication and UI state
- `db.json`: JSON Server seed data
