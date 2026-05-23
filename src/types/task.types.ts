// export interface Task  {
//     readonly id: number;
//     title: string;
//     completed: boolean
// }

import { z } from "zod";

export const taskSchema = z
  .object({
    id: z.number().readonly(),
    title: z.string().min(1, "Title is Required"),
    completed: z.boolean(),
  })
  .strict();

export const createTaskBody = taskSchema.omit({ id: true }); // remove id properties
export const updateTaskBody = createTaskBody.partial();

// export const createTaskSchema = taskSchema.omit({ id: true }); // remove id properties

export const createTaskSchema = z.object({
  body: createTaskBody,
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const updateTaskSchema = z.object({
  body: updateTaskBody,
  params: z.object({id: z.coerce.number()}),
  query: z.object({}).optional(),
});


export type Task = z.infer<typeof taskSchema>;
export type CreateTask = z.infer<typeof createTaskBody>; //remove id properties
export type UpdateTask = z.infer<typeof updateTaskBody>; //makes all properties optional


// taskSchema.omit({ id: true })
// // Removes id → { title: string, completed: boolean }

// taskSchema.pick({ title: true })
// // Keeps only title → { title: string }

// createTaskBody.partial()
// // Makes all fields optional → { title?: string, completed?: boolean }

// createTaskBody.partial().required()
// // Forces all fields back to required

// taskSchema.extend({ createdAt: z.date() })
// // Adds a new field → { id, title, completed, createdAt }

// z.coerce.number()
// // Converts "123" (string from URL) → 123 (number) automatically
