import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import {
  createNote,
  deleteNote,
  getAllNotes,
  getNoteById,
  updateNote,
} from "./note.controller.js";
import { asyncWrapper } from "../../middlewares/asyncWrapper.js";
import {
  createNoteReqSchema,
  deleteNoteReqSchema,
  getNoteByIdReqSchema,
  getNotesQuery,
  updateNoteReqSchema,
} from "./model/note.schema.js";

const router = Router();

router.get("/", validate(getNotesQuery), asyncWrapper(getAllNotes));
router.get("/:id", validate(getNoteByIdReqSchema), asyncWrapper(getNoteById));
router.post("/new", validate(createNoteReqSchema), asyncWrapper(createNote));
router.patch("/:id", validate(updateNoteReqSchema), asyncWrapper(updateNote));
router.delete("/:id", validate(deleteNoteReqSchema), asyncWrapper(deleteNote));

export default router;
