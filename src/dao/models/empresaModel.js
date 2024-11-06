import mongoose from "mongoose";

const organizationCollection = "empresa"; //Nombre de la colección

//Modelo de Schema

const organizationSchema = new mongoose.Schema({
  products: {
    type: [
      {
        nombre: { type: String },
        rut: { type: String },
      },
    ],
    dafault: [],
  },
});

export const organizationModel = mongoose.model(
  organizationCollection,
  organizationSchema
);
