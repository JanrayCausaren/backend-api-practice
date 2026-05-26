# Backend Schema Naming Convention Guide

## Purpose

This guide explains the naming conventions used for:
- Zod schemas
- TypeScript types
- request validation
- domain entities
- query params
- update payloads

The goal is to keep the backend:
- scalable
- readable
- maintainable
- predictable

---

# Core Principle

Different parts of the application have different responsibilities.

Because of that, we separate:
- database entities
- create payloads
- update payloads
- query params
- route params

instead of using one giant schema everywhere.

---

# Naming Convention Overview

| Purpose | Schema Name | Type Name |
|---|---|---|
| Full entity/domain model | `noteSchema` | `Note` |
| Create request payload | `createNoteSchema` | `CreateNoteInput` |
| Update request payload | `updateNoteSchema` | `UpdateNoteInput` |
| Route params | `noteParamsSchema` | `NoteParams` |
| Query params | `getNotesQuerySchema` | `GetNotesQuery` |
| API response DTO (optional) | `noteResponseSchema` | `NoteResponse` |

---

# 1. Base Entity Schema

Represents the FULL stored entity in the database.

Includes:
- id
- timestamps
- internal fields

Example:

```ts
export const noteSchema = z.object({
  id: z.number(),
  title: z.string().min(3),
  content: z.string().min(3),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
}).strict();

export type Note =
  z.infer<typeof noteSchema>;
```

## Naming

Schema:

```ts
noteSchema
```

Type:

```ts
Note
```

---

# 2. Create Request Schema

Represents the payload used when creating data.

Usually excludes:
- id
- timestamps
- generated fields

Example:

```ts
export const createNoteSchema = z.object({
  body: z.object({
    title: z.string().min(3),
    content: z.string().min(3),
  }).strict(),
});

export type CreateNoteInput =
  z.infer<typeof createNoteSchema>["body"];
```

## Naming

Schema:

```ts
createNoteSchema
```

Type:

```ts
CreateNoteInput
```

---

# 3. Update Schema

Represents PATCH/UPDATE payloads.

Usually partial fields.

Example:

```ts
export const updateNoteSchema = z.object({
  body: z.object({
    title: z.string().min(3).optional(),
    content: z.string().min(3).optional(),
  }).strict(),
});

export type UpdateNoteInput =
  z.infer<typeof updateNoteSchema>["body"];
```

## Naming

Schema:

```ts
updateNoteSchema
```

Type:

```ts
UpdateNoteInput
```

---

# 4. Route Params Schema

Represents route parameters.

Example route:

```txt
GET /notes/:id
```

Example:

```ts
export const noteParamsSchema = z.object({
  params: z.object({
    id: z.coerce.number(),
  }),
});

export type NoteParams =
  z.infer<typeof noteParamsSchema>["params"];
```

## Naming

Schema:

```ts
noteParamsSchema
```

Type:

```ts
NoteParams
```

---

# 5. Query Schema

Represents query string parameters.

Example route:

```txt
GET /notes?page=1&search=test
```

Example:

```ts
export const getNotesQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
    search: z.string().optional(),
  }),
});

export type GetNotesQuery =
  z.infer<typeof getNotesQuerySchema>["query"];
```

## Naming

Schema:

```ts
getNotesQuerySchema
```

Type:

```ts
GetNotesQuery
```

---

# 6. Response DTO (Optional)

Represents API response shape.

Useful for:
- hiding internal fields
- transforming responses
- public API formatting

Example:

```ts
export const noteResponseSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
});

export type NoteResponse =
  z.infer<typeof noteResponseSchema>;
```

---

# Recommended Folder Structure

```txt
note/
├── note.schema.ts
├── note.types.ts
├── note.service.ts
├── note.repository.ts
├── note.controller.ts
└── note.routes.ts
```

---

# Recommended Schema File Organization

Example:

```ts
// note.schema.ts

export const noteSchema = ...
export const createNoteSchema = ...
export const updateNoteSchema = ...
export const noteParamsSchema = ...
export const getNotesQuerySchema = ...
```

---

# Recommended Type File Organization

Example:

```ts
// note.types.ts

export type Note = ...
export type CreateNoteInput = ...
export type UpdateNoteInput = ...
export type NoteParams = ...
export type GetNotesQuery = ...
```

---

# Professional Principles

## 1. Separate Responsibilities

Do NOT use one schema for everything.

Different layers have different purposes:
- DB entity
- create payload
- update payload
- params
- query

---

## 2. Validate All External Input

Always validate:
- body
- params
- query

Never trust user input directly.

---

## 3. Keep Naming Predictable

Use consistent suffixes:
- `Schema`
- `Input`
- `Params`
- `Query`

Avoid random naming styles.

---

## 4. Use Type Inference

Prefer:

```ts
z.infer<typeof schema>
```

instead of manually rewriting types.

---

# Example Real-World Naming

```ts
noteSchema
createNoteSchema
updateNoteSchema
noteParamsSchema
getNotesQuerySchema
```

```ts
Note
CreateNoteInput
UpdateNoteInput
NoteParams
GetNotesQuery
```

This pattern is:
- scalable
- professional
- readable
- maintainable
- common in TypeScript backends