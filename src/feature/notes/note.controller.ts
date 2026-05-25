import type { Request, Response } from "express";
import {
  createNoteService,
  deleteNoteService,
  getAllNotesService,
  getNoteByIdService,
  updateNoteService,
} from "./note.services.js";
import {
  createNoteReqSchema,
  deleteNoteReqSchema,
  getNoteByIdReqSchema,
  paginationSchema,
  updateNoteReqSchema,
} from "./note.type.js";
import { NotFoundError } from "../../error/app.error.js";

export const getAllNotes = async (req: Request, res: Response) => {
  const query = paginationSchema.parse(req.query);

  const limit = query.limit;
  const page = query.page;
  const search = query.search;
  const sort = query.sort;

  const result = await getAllNotesService({
    page,
    limit,
    search,
    sort,
    // page,
    // limit,
    //  ...(query.search && {
    //   search: query.search,
    // }),
    // ...(query.sort && {
    //   sort: query.sort,
    // }),
  });

  console.log(req.query);

  return res.json({
    message: "Pagination validated",
    data: result,
    pagination: {
      page,
      limit,
    },
  });
  // res.status(200).json(result);
};

export const getNoteById = async (req: Request, res: Response) => {
  const parsed = getNoteByIdReqSchema.parse({
    params: req.params,
  });

  const id = parsed.params.id;

  const note = await getNoteByIdService(id);

  if (!note) {
    throw new NotFoundError("Note not found");
  }

  res.status(200).json({
    success: true,
    data: note,
  });
};

export const createNote = async (req: Request, res: Response) => {
  const parsed = createNoteReqSchema.parse({
    body: req.body,
  });

  const result = await createNoteService(parsed.body);

  res.status(201).json({
    success: true,
    data: result,
  });
};

export const updateNote = async (req: Request, res: Response) => {
  const parsed = updateNoteReqSchema.parse({
    params: req.params,
    body: req.body,
  });

  const updated = await getNoteByIdService(parsed.params.id);

  if (!updated) {
    throw new NotFoundError("Note not found");
  }

  const result = await updateNoteService(parsed);

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const deleteNote = async (req: Request, res: Response) => {
  const parsed = deleteNoteReqSchema.parse({
    params: req.params,
  });

  const result = await deleteNoteService(parsed.params.id);

  if (!result) {
    throw new NotFoundError("Note not found");
  }

  res.status(200).json({
    success: true,
    message: "Note Deleted Successfuly",
  });
};
