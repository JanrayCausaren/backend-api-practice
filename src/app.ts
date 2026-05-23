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
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import noteRoutes from "./notes/note.routes.js";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/notes", noteRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("application listening at http://localhost:3000");
});
