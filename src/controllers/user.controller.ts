// src/controllers/user.controller.ts
// src/controllers/user.controller.ts
import type { Request, Response, NextFunction } from "express";
import * as UserService from "../services/user.service.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export async function createUser(req: Request, res: Response) {
    const newUser = console.log('new user: Janray');
    res.send(newUser);
}
