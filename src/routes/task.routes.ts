import { Router } from "express";
import {
  createTask,
  getAllTask,
  getTaskById,
  updateTask,
} from "../controllers/task.controller.js";
import { validate } from "../middlewares/validate.js";
import { createTaskSchema, updateTaskSchema } from "../types/task.types.js";
import { asyncWrapper } from "../middlewares/asyncWrapper.js";
// import { createTaskSchema } from '../schema/task.schema.js';

const router = Router();

router.get("/", getAllTask);
router.get("/:id", getTaskById);
router.post("/new", validate(createTaskSchema), asyncWrapper(createTask));
router.patch("/:id", validate(updateTaskSchema), asyncWrapper(updateTask));

export default router;
