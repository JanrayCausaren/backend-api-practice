import { type Request, type Response } from "express";
import {
  createTaskService,
  getTaskByIdService,
  getTaskService,
  updateTaskService,
} from "../services/task.service.js";
import type { CreateTask, UpdateTask } from "../types/task.types.js";
import { NotFoundError, ValidationError } from "../error/app.error.js";
// import { number } from "zod";

export const getAllTask = async (_req: Request, res: Response) => {
  const allTask = await getTaskService();
  res.status(200).json(allTask); // ✓ status BEFORE json
};

// export const getTaskById = async (
//   req: Request<{ id: string }>,
//   res: Response
// ) => {
//   const id = Number(req.params.id);

//   if (isNaN(id)) {
//     return res.status(400).json({
//       message: "Invalid ID",
//     });
//   }

//   const task = await getTaskByIdService(id);

//   if (!task) {
//     return res.status(404).json({
//       message: "Task not found",
//     });
//   }

//   res.status(200).json(task);
// };

// export const getTaskById = async (
//   req: Request<{ id: string }>,
//   res: Response,
// ) => {
//   const id = Number(req.params.id);

//   if (isNaN(id)) {
//     res.status(400).json({
//       message: "Invalid ID",
//     });

//     return;
//   }

//   const task = await getTaskByIdService(id);

//   if (!task) {
//     res.status(404).json({
//       message: "Task not found",
//     });

//     return;
//   }

//   res.status(200).json(task);
// };



export const getTaskById = async (req: Request<{id:string}>, res: Response) => {
  const id = Number(req.params.id);

  if (isNaN(id)) throw new ValidationError('ID must be a number');
  //             ^^^^^ errorHandler catches this → sends 400 automatically

  const task = await getTaskByIdService(id);

  if (!task) throw new NotFoundError('Task not found');
  //         ^^^^^ errorHandler catches this → sends 404 automatically

  res.status(200).json(task);
};

// export const createTask = async (
//   req: Request<{}, {}, CreateTask>,
//   res: Response,
// ) => {
//   const newTask = await createTaskService(req.body);

//   res.status(201).json(newTask);
// };

// export async function updateTask(
//   req: Request<{ id: string }, {}, UpdateTask>,
//   res: Response,
// ) {
//   const id = Number(req.params.id);

//   if (isNaN(id)) {
//     res.status(400).json({
//       message: "Must be a number"
//     });
//   }

//   const updatedTask = await updateTaskService(id, req.body);
//   res.status(200).json({ message: "Task Updated", updatedTask });
// }

// export const createTask = async (
//   req: Request<{}, {}, CreateTask>,
//   res: Response,
// ): Promise<void> => {
//   try {
//     const newTask = await createTaskService(req.body);

//     res.status(201).json({
//       success: true,
//       data: newTask,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };
export const createTask = async (
  req: Request<{}, {}, CreateTask>,
  res: Response
) => {
  // No try/catch — asyncWrapper handles errors automatically
  const newTask = await createTaskService(req.body);
  res.status(201).json({ success: true, data: newTask });
};


// export const updateTask = async (
//   req: Request<{ id: string }, {}, UpdateTask>,
//   res: Response,
// ): Promise<void> => {
//   try {
//     // No need to validate id here — Zod already did it
//     const id = Number(req.params.id);

//     const updatedTask = await updateTaskService(id, req.body);

//     // if (!updatedTask) {
//     //   res.status(404).json({
//     //     success: false,
//     //     message: "Task not found",
//     //   });
//     //   return; // ✅ always return after sending a response
//     // }
//     if (!updatedTask) throw new NotFoundError('Task not found');

//     res.status(200).json({
//       success: true,
//       data: updatedTask,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };


export const updateTask = async (
  req: Request<{id:string}, {}, UpdateTask>,
  res: Response
) => {
  const id = Number(req.params.id);
  const updatedTask = await updateTaskService(id, req.body);

  if (!updatedTask) throw new NotFoundError('Task not found');
  // ^^^^^ now this reaches errorHandler correctly → sends 404

  res.status(200).json({ success: true, data: updatedTask });
};