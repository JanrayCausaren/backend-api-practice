import type { NoteDocument } from "../note.document.js";
import type { Note } from "../note.type.js";

export const toNoteResponse = (doc: NoteDocument): Note => ({
  id: doc._id.toString(),
  title: doc.title,
  content: doc.content,
  createdAt: doc.createdAt.toISOString(),
  updatedAt: doc.updatedAt.toISOString(),
});
