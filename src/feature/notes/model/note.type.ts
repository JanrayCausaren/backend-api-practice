import type z from "zod";
import type {
  noteSchema,
  createNoteBodySchema,
  updateNoteBodySchema,
  updateNoteReqSchema,
  deleteNoteReqSchema,
  getNotesQuery,
} from "./note.schema.js";

export type Note = z.infer<typeof noteSchema>;
export type GetNotesQuery = z.infer<typeof getNotesQuery>;
export type CreateNoteInput = z.infer<typeof createNoteBodySchema>;
export type UpdateNoteBody = z.infer<typeof updateNoteBodySchema>;
export type UpdateNotePayload = z.infer<typeof updateNoteReqSchema>;
export type DeleteNoteParams = z.infer<typeof deleteNoteReqSchema>;
