import type { PaginationResponse } from "../../utils/paginated.response.js";
import { toNoteResponse } from "./model/dto/note.response.dto.js";
import { NoteModel } from "./model/note.document.js";
import type {
  CreateNoteInput,
  Note,
  UpdateNotePayload,
} from "./model/note.type.js";

let notes: Note[] = [];

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
}: GetAllNotesParams): Promise<PaginationResponse<Note[]>> => {
  const skip = (page - 1) * limit;

  //Filter object
  const filter: any = {
    deletedAt: null,
  };

  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  // SORT OBJECT
  let sortOption = {};

  if (sort === "asc") {
    sortOption = { title: 1 };
  }

  if (sort === "desc") {
    sortOption = { title: -1 };
  }

  console.log("------");
  console.log(filter);
  console.log(sortOption);

  // VERY IMPORTANT
  // Run both queries together
  const [result, total] = await Promise.all([
    NoteModel.find(filter).sort(sortOption).skip(skip).limit(limit),

    NoteModel.countDocuments(filter),
  ]);

  return {
    data: result.map(toNoteResponse),
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };

  // // DATABASE QUERY
  // const result = await NoteModel.find(filter)
  //   .sort(sortOption)
  //   .skip(skip)
  //   .limit(limit)
  //   .lean();

  // return result.map(toNoteResponse);
};
// export const getAllNotesService = async ({
//   page,
//   limit,
//   search,
//   sort,
// }: GetAllNotesParams): Promise<Note[] | null> => {
//   const skip = (page - 1) * limit;

//   let filteredNotes = notes.filter((n) => n.deletedAt === null);

//   if (search) {
//     filteredNotes = filteredNotes.filter((n) =>
//       n.title.toLowerCase().includes(search.toLowerCase()),
//     );
//   }

//   if (sort === "asc") {
//     filteredNotes.sort((a, b) => a.title.localeCompare(b.title));
//   }
//   if (sort === "desc") {
//     filteredNotes.sort((a, b) => b.title.localeCompare(a.title));
//   }

//   const paginatedNotes = filteredNotes.slice(skip, skip + limit);

//   return paginatedNotes;
// };

export const getNoteByIdService = async (id: string): Promise<Note | null> => {
  const result = await NoteModel.findOne({
    _id: id,
    deletedAt: null,
  });

  if (!result) return null;

  return toNoteResponse(result);
};
// export const getNoteByIdService = async (id: string): Promise<Note | null> => {
//   const note = notes.find((n) => n.id === id && n.deletedAt === null) ?? null;
//   return note;
// };

export const createNoteService = async (
  data: CreateNoteInput,
): Promise<Note> => {
  // const newNote: Note = {
  //   id: notes.length + 1,
  //   title: data.title,
  //   content: data.content,
  //   createdAt: new Date().toISOString(),
  //   deletedAt: null,
  // };

  const result = await NoteModel.create({
    title: data.title,
    content: data.content,
  });

  return toNoteResponse(result);
};

export async function updateNoteService(
  payload: UpdateNotePayload,
): Promise<Note | null> {
  const parameter = payload.params;
  const body = payload.body;

  const result = await NoteModel.findOneAndUpdate(
    {
      _id: parameter.id,
      deletedAt: null,
    },
    {
      $set: {
        ...(body.title !== undefined && {
          title: body.title,
        }),

        ...(body.content !== undefined && {
          content: body.content,
        }),
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result){
    return null
  }

  return toNoteResponse(result);
}

export const deleteNoteService = async (id: string): Promise<Note | null> => {
  const selectedNote = await NoteModel.findByIdAndUpdate(
    { _id: id, deletedAt: null },
    { deletedAt: new Date() },
  );

  if (!selectedNote) {
    return null;
  }

  console.log(selectedNote);
  return toNoteResponse(selectedNote);
};
