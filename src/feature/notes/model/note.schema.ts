import { z } from "zod";

//validators


/**
 * Base entity (DB shape)
 */
export const noteSchemaAll =  z.object({
  id: z.string(),
  title: z.string().min(3),
  content: z.string().min(3),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  deletedAt: z.string().nullable(),
}).strict();

export const noteSchema = noteSchemaAll.omit({deletedAt: true});

/**
 * PARAMS (IMPORTANT: separate from DB schema)
 */
export const idParamSchema = z.object({
  id: z.string(),
});

//Query for pagination

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1), 
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  sort: z.enum(["all","asc", "desc"], "invalid sorting").default("all"),
  // skip: z.coerce.number().min(1).default(1), 
});

/**
 * BODY schemas
 */
export const createNoteBodySchema = noteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export const updateNoteBodySchema = noteSchema
  .omit({ id: true, createdAt: true  })
  .partial();

/**
 * REQUEST schemas (API contracts)
 */
export const createNoteReqSchema = z.object({
  body: createNoteBodySchema,
});

export const updateNoteReqSchema = z.object({
  params: idParamSchema,
  body: updateNoteBodySchema,
});

export const  getNotesQuery = z.object({
  query: paginationSchema,
});

export const getNoteByIdReqSchema = z.object({
  params: idParamSchema,
 
});

export const deleteNoteReqSchema = z.object({
  params: idParamSchema,
});
