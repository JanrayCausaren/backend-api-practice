import { NoteEntity, TaskTry } from "./note.model.js";
import type { CreateNote, Note, UpdateNote } from "./note.type.js";

let notes: Note[] = [
  {
    id: 1,
    title: "A",
    content: "aadflkjasldfjlkasdfkahdklfhajkdfh",
    createdAt: new Date().toISOString(),
    deletedAt: null,
  },
  {
    id: 2,
    title: "D",
    content: "aadflkjasldfjlkasdfkahdklfhajkdfh",
    createdAt: new Date().toISOString(),
    deletedAt: null,
  },
  {
    id: 3,
    title: "Learning C",
    content: "aadflkjasldfjlkasdfkahdklfhajkdfh",
    createdAt: new Date().toISOString(),
    deletedAt: null,
  },
  {
    id: 4,
    title: "Learning A",
    content: "aadflkjasldfjlkasdfkahdklfhajkdfh",
    createdAt: new Date().toISOString(),
    deletedAt: null,
  },
  {
    id: 5,
    title: "Learning Z",
    content: "aadflkjasldfjlkasdfkahdklfhajkdfh",
    createdAt: new Date().toISOString(),
    deletedAt: null,
  },
];

type GetAllNotesParams = {
  page: number;
  limit: number;
  search?: string | undefined;
  sort: "asc" | "desc" | "all";
};

export const getAllNotesService = async ({
  page,
  limit,
  search,
  sort,
}: GetAllNotesParams): Promise<Note[] | null> => {
  // const skip = (page - 1) * limit;
  // let filteredNotes : Note[];
  // filteredNotes = notes.filter((n) => n.title.toLowerCase().includes(search?.toLowerCase()) n.deletedAt === null);
  // const filteredNotes = notes.filter((n) => n.deletedAt === null);
  const skip = (page - 1) * limit;

  let filteredNotes = notes.filter((n) => n.deletedAt === null);

  if (search) {
    filteredNotes = filteredNotes.filter((n) =>
      n.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (sort === "asc") {
    filteredNotes.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (sort === "desc") {
    filteredNotes.sort((a, b) => b.title.localeCompare(a.title));
  }

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

  await NoteEntity.create({ title: params.title, content: params.content });
  await TaskTry.create({ title: params.title, content: params.content });

  console.log("Succesfully send");

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
