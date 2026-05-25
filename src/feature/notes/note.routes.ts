import { Router } from "express";
import {validate } from "../../middlewares/validate.js";
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote,  } from "./note.controller.js";
import { createNoteReqSchema, deleteNoteReqSchema, getNoteByIdReqSchema, getNoteReqSchema, updateNoteReqSchema } from "./note.type.js";
import { asyncWrapper } from "../../middlewares/asyncWrapper.js";

const router = Router();

router.get('/', validate(getNoteReqSchema), asyncWrapper(getAllNotes) )
router.get('/:id',validate(getNoteByIdReqSchema), asyncWrapper(getNoteById) )
router.post('/new', validate(createNoteReqSchema), asyncWrapper(createNote))
router.patch('/:id', validate(updateNoteReqSchema), asyncWrapper(updateNote))
router.delete('/:id', validate(deleteNoteReqSchema), asyncWrapper(deleteNote))


export default router