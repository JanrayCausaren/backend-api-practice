import type { Request, Response } from "express";
import {
  createNoteService,
  deleteNoteService,
  getAllNotesService,
  getNoteByIdService,
  updateNoteService,
} from "./note.services.js";

import { NotFoundError, ValidationError } from "../../utils/error/app.error.js";
import {
  createNoteReqSchema,
  deleteNoteReqSchema,
  getNoteByIdReqSchema,
  paginationSchema,
  updateNoteReqSchema,
} from "./model/note.schema.js";
import { successResponse } from "../../utils/success.response.js";
import { successPaginatedResponse } from "../../utils/paginated.response.js";
import mongoose from "mongoose";

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

  successPaginatedResponse({
    res: res,
    statusCode: 200,
    message: "Pagination validated",
    data: result.data,
    pagination: result.pagination,
  });

  // res.json({
  //   message: "",
  //   data: result,
  //   pagination: {
  //     page,
  //     limit,
  //   },
  // });
  // res.status(200).json(result);
};

export const getNoteById = async (req: Request, res: Response) => {
  const parsed = getNoteByIdReqSchema.parse({
    params: req.params,
  });

  const id = parsed.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ValidationError("Invalid note ID");
  }

  const note = await getNoteByIdService(id);

  if (!note) {
    throw new NotFoundError("Note not found");
  }

  successResponse({
    res: res,
    statusCode: 200,
    message: "Resource Found",
    data: note,
  });
};

export const createNote = async (req: Request, res: Response) => {
  const parsed = createNoteReqSchema.parse({
    body: req.body,
  });

  const result = await createNoteService(parsed.body);

  successResponse({
    message: "Note Created!",
    data: result,
    res: res,
    statusCode: 201,
  });

  // res.status(201).json({
  //   success: true,
  //   data: result,
  // });
};

export const updateNote = async (req: Request, res: Response) => {
  const parsed = updateNoteReqSchema.parse({
    params: req.params,
    body: req.body,
  });

  if (!mongoose.Types.ObjectId.isValid(parsed.params.id)) {
    throw new NotFoundError("Note not found");
  }

  const result = await updateNoteService(parsed);

  if (!result) {
    throw new NotFoundError("Note not found");
  }

  successResponse({
    res: res,
    statusCode: 200,
    message: "Note Updated",
    data: result,
  });

  // res.status(200).json({
  //   success: true,
  //   data: result,
  // });
};

export const deleteNote = async (req: Request, res: Response) => {
  const parsed = deleteNoteReqSchema.parse({
    params: req.params,
  });

  if (!mongoose.Types.ObjectId.isValid(parsed.params.id)) {
    throw new NotFoundError("Note not found");
  }

  const result = await deleteNoteService(parsed.params.id);

  if (!result) {
    throw new NotFoundError("Note not found");
  }

  successResponse({
    res: res,
    statusCode: 200,
    message: "Deleted Successfuly",
    data: result,
  });

};
