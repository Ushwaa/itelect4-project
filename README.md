# ITELECT4 Submission Tracker

A React and TypeScript frontend for managing courses and student submissions. The project contains the progressive graded-task work from GT1 Part 1 through GT3 Part 3.

## Features

- GT1 TypeScript foundations: strict typing, interfaces, aliases, unions, intersections, narrowing, generics, utility types, enums, and `ReturnType`
- GT2 typed React components, hooks, search/filtering, API requests, loading/error states, and backend data
- GT3 React Router pages, protected submissions, TanStack Query queries and mutations, Zustand UI/auth state, and React Context with `useReducer`
- GT3 Part 3 forms using React Hook Form, Zod-derived types, `.refine()` validation, and Shadcn-style `Button`, `Input`, and `Label` components

## GT3 Part 3 Completion

The frontend uses the Express backend for courses, registration, login, and submissions. Valid submission writes use TanStack Query and refresh the submissions query; invalid course and repository values show field-level Zod errors. Forms use `z.infer`, React Hook Form, and the shared Button, Input, and Label components.

## Installation

```bash
npm install
```

## Run the application

Set up the frontend environment file using `.env.example`, then start the backend in its repository on port 4000. Start the frontend in this repository:

```bash
npm run dev
```

The frontend runs on Vite's default port, usually `http://localhost:5173/`. For local development, `.env` should contain `VITE_API_URL=http://localhost:4000`.

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
- `src/pages/`: routed dashboard, courses, login, registration, and submissions views
- `src/api/client.ts`: shared typed HTTP client for the backend API
- `src/context/`: Context and reducer global state
- `src/hooks/`: reusable typed hooks
- `src/schemas/`: Zod validation schemas
- `src/store/`: persisted authentication and UI state
- `.env.example`: Vite backend URL template

## Backend API configuration

The frontend reads its backend origin from `VITE_API_URL`. The local `.env` value is `http://localhost:4000`. Do not add `/api` or a trailing slash to the base URL. The real `.env` file is ignored by Git.

For Vercel, set `VITE_API_URL` in the frontend project's environment variables to the actual backend origin, for example `https://your-backend.example`, without `/api` or a trailing slash. Vite embeds this value at build time, so changing it requires a new frontend deployment. Set it for the Production or Preview environment you are deploying.

After the frontend is deployed, set the backend's `CORS_ORIGIN` to the exact frontend origin (scheme and hostname, no path or trailing slash) and redeploy the backend.

## Backend integration requirement

The frontend creates submissions with only `courseCode` and `repoUrl`, as required by the API contract. The current backend controller still rejects a create request unless it includes a numeric `studentId`. The backend must be updated to derive the owner from the verified JWT and not require a client-invented `studentId` before submission creation can pass end-to-end.

## Vercel build settings

- Build command: `npm run build`
- Output directory: `dist`
