import mongoose from "mongoose";

export const usuariosModelo = mongoose.model(
  "user",
  new mongoose.Schema(
    {
      first_name: { type: String },
      last_name: { type: String },
      role: { type: String },
      email: { type: String, unique: true },
      password: { type: String, required: true },
      organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organization",
      },
    },
    {
      timestamps: true,
    }
  )
);
