import { z } from "zod";





/**
 * Base entity (DB shape)
 */
export const noteSchema = z.object({
  id: z.number(),
  title: z.string().min(3),
  content: z.string().min(3),
  createdAt: z.string(),
  deletedAt: z.string().nullable(),
}).strict();

/**
 * PARAMS (IMPORTANT: separate from DB schema)
 */
export const idParamSchema = z.object({
  id: z.coerce.number(),
});

//Query for pagination

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1), 
  limit: z.coerce.number().min(1).max(100).default(10),
  // skip: z.coerce.number().min(1).default(1), 
});

/**
 * BODY schemas
 */
export const createNoteBodySchema = noteSchema.omit({
  id: true,
  createdAt: true,
  deletedAt: true
});

export const updateNoteBodySchema = noteSchema
  .omit({ id: true, createdAt: true })
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

export const  getNoteReqSchema = z.object({
  query: paginationSchema,
});

export const getNoteByIdReqSchema = z.object({
  params: idParamSchema,
 
});

export const deleteNoteReqSchema = z.object({
  params: idParamSchema,
});





export type Note = z.infer<typeof noteSchema>;
export type GetNoteId = z.infer<typeof getNoteReqSchema>;
export type CreateNote = z.infer<typeof createNoteBodySchema>;
export type UpdateNoteBody = z.infer<typeof updateNoteBodySchema>;
export type UpdateNote = z.infer<typeof updateNoteReqSchema>;
export type DeleteNote = z.infer<typeof deleteNoteReqSchema>;




// import { z } from "zod";

// export const noteShema = z
//   .object({
//     id: z.number().readonly(),
//     title: z.string().min(3),
//     content: z.string().min(3),
//     createdAt: z.string(),
//   })
//   .strict();

// export const paramsToNumberSchema = z.object({
//   params: z.object({
//     id: z.coerce.number(),
//   }),
// });

// export const getNoteId = noteShema.pick({ id: true });
// export const createNoteBody = noteShema.omit({ id: true, createdAt: true });
// export const updateNoteBody = noteShema.omit({createdAt: true, id: true }).partial({title: true, content: true});

// export const createNoteReq = z.object({
//   body: createNoteBody,
//   params: z.object({}).optional(),
//   query: z.object({}).optional(),
// });





// export const updateNoteReq = z.object({
//   body: updateNoteBody,
//   params: z.object({
//     id: z.coerce.number(),
//   }),
//   query: z.object({}).optional(),
// });

// export type Note = z.infer<typeof noteShema>;
// export type GetNoteId = z.infer<typeof getNoteId>;
// export type CreateNote = z.infer<typeof createNoteBody>;
// export type UpdateNote = z.infer<typeof updateNoteBody>;
