import mongoose, { Types } from "mongoose";

export type NoteDocument = {
  _id: Types.ObjectId;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date ;
  deletedAt: Date | null;
};

const schema = new mongoose.Schema(
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

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    strict: true,
    strictQuery: false, //By default, Mongoose does not cast filter properties that aren't in your schema.
    timestamps: true,
  },
);

export const NoteModel = mongoose.model<NoteDocument>("notes", schema);
