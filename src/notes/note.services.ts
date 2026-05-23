import type { CreateNote, Note, UpdateNote } from "./note.type.js";

let notes: Note[] = [
  {
    id: 1,
    title: "Note 1",
    content: "loremasdfhfd",
    createdAt: new Date().toISOString(),
    deletedAt: null,
  },
];

type GetAllNotesParams = {
  page: number;
  limit: number;
};

export const getAllNotesService = async ({
  page,
  limit,
}: GetAllNotesParams): Promise<Note[] | null> => {
  const skip = (page - 1) * limit;
  const filteredNotes = notes.filter((n) => n.deletedAt === null);

  const paginatedNotes = filteredNotes.slice(skip, skip + limit);

  return paginatedNotes;
};

export const getNoteByIdService = async (id: number): Promise<Note | null> => {
  const note = notes.find((n) => n.id === id && n.deletedAt === null) ?? null;
  return note;
};

export const createNoteService = async (
  params: CreateNote,
): Promise<Note[]> => {
  const newNote: Note = {
    id: notes.length + 1,
    title: params.title,
    content: params.content,
    createdAt: new Date().toISOString(),
    deletedAt: null,
  };

  notes.push(newNote);
  return notes;
};

export async function updateNoteService(
  params: UpdateNote,
): Promise<Note[] | null> {
  const parameter = params.params;
  const body = params.body;

  const selectedNote = await getNoteByIdService(parameter.id);

  if (!selectedNote) {
    return null;
  }

  if (body.title !== undefined) {
    selectedNote.title = body.title;
  }
  if (body.content !== undefined) {
    selectedNote.content = body.content;
  }

  return notes;
}

export const deleteNoteService = async (id: number): Promise<Note | null> => {
  const note = notes.find((n) => n.id === id && n.deletedAt === null);

  if (!note) {
    return null;
  }

  note.deletedAt = new Date().toISOString();

  return note;
};
