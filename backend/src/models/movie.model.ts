import { Schema, model } from "mongoose";

export interface Movie {
  id: string;
  name: string;
  img_url: string;
  video_url: string;
  state: string;
  year: string;
  genre: string[];
  language: string;
  duration: string;
  create_time: Date;
}

export const MovieSchema = new Schema<Movie>(
  {
    name: { type: String, required: true },
    img_url: { type: String, required: true },
    video_url: { type: String, required: true },
    state: { type: String, required: true },
    year: { type: String, required: true },
    genre: { type: [String], required: true },
    language: { type: String, required: true },
    duration: { type: String, required: true },
    create_time: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const MovieModel = model<Movie>("movie", MovieSchema);
