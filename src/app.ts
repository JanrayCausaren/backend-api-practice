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
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(process.env.MONGO_URI!, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("Mongo DB Connected Successfully");

    console.log(
      "Connected DB:",
      mongoose.connection.db?.databaseName
    );
  })
  .catch((err) =>
    console.log(`Error connection: ${err}`)
  );

app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/notes", noteRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("application listening at http://localhost:3000");
});
