import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
    },

    content: {
      type: String,
      required: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

const taskTry = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
    },

    content: {
      type: String,
      required: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

export const NoteEntity =
  mongoose.model("notes", noteSchema);
export const TaskTry =
  mongoose.model("tasks", taskTry);
