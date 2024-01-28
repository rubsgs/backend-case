import { Model } from "mongoose";
import { documentModel } from "./document.model";

export async function saveDocumentModel(document) {
  const model = new documentModel({ ...document });
  return await model.save();
}

export async function getDocument(id) {
  const model = await documentModel.find({ _id: id });
  return model;
}
