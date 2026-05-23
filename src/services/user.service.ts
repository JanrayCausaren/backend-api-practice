// src/services/user.service.ts

import type { User } from "../types/user.types.js";


const users: User[] = [
  { id: '1', name: 'Juan dela Cruz', email: 'juan@email.com' },
  { id: '2', name: 'Maria Santos',   email: 'maria@email.com' },
];

export const getAllUsers = async (): Promise<User[]> => {
  return users;
};