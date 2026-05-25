// src/app.ts
// import express, { type Request, type Response, type NextFunction } from 'express';
// import userRoutes from './routes/user.routes.js';

// const app = express();

// app.use(express.json());
// app.use('/users', userRoutes);

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   res.status(500).json({ error: err.message });
// });

// export default app;

import express from "express";
import userRoutes from "./feature/user/user.routes.js";
import taskRoutes from "./feature/tasks/task.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import noteRoutes from "./feature/notes/note.routes.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(express.json());
await main().catch((err) => console.log(`Error connection: ${err}`));
async function main() {
  await mongoose.connect(process.env.MONGO_URI!).then(() => {
    console.log("Mongo DB Connected Successfully");

    console.log("Connected DB:", mongoose.connection.db?.databaseName);
  });
}
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/notes", noteRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("application listening at http://localhost:3000");
});
