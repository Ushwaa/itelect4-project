# IT Elective 4 - TypeScript Foundations (ITELECT4)

## Project Title

ITELECT4 TypeScript Foundations - GT1

## Project Description

This repository contains a TypeScript project for the ITELECT4 Session 1 Graded Task (GT1). It demonstrates core TypeScript features including primitive types, functions, generics, interfaces, type aliases, utility types, enums, and type narrowing. The project is configured with strict compiler options.

## Features

- Explicit primitive type annotations
- Functions with typed parameters and return values
- Generic functions and generic interfaces
- Utility type examples (`Partial`, `Pick`, `Omit`, `Record`)
- `ReturnType` usage example
- Enums (`SubmissionStatus`, `Role`)
- Zero TypeScript compiler errors with strict settings

## Interfaces Created

- `User`
- `Course`
- `Submission`
- `ApiResponse<T>`

## Type Aliases

- `ID`
- `Coordinate`
- `Formatter`
- `StringOrNumber`
- `Status`
- `StudentWithCourse`

## Utility Types

- `UserUpdate` (Partial<User>)
- `UserPreview` (Pick<User, "id" | "name" | "role")
- `PublicUser` (Omit<User, "email" | "isActive")
- `RoleCount` (Record<"student" | "admin" | "instructor", number>)

## Enums

- `SubmissionStatus` (Pending, Graded, Late)
- `Role` (Student, Admin, Instructor)

## How to Install

Run:

```bash
npm install
```

## How to Run

Run the main TypeScript file using `ts-node`:

```bash
npx ts-node src/index.ts
```

## How to Check TypeScript Errors

To verify there are no TypeScript errors:

```bash
npx tsc --noEmit
```

## Project Folder Structure

```
itelect4-project/
├── src/
│   ├── index.ts
│   └── sample.ts
├── types/
│   └── index.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

This project follows strict TypeScript settings and demonstrates best practices for typing and code organization.
