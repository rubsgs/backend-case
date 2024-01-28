import mongoose from "mongoose";
import { documentModel } from "./document.model.js";
import { makeConnection } from '../common/connection-factory.js'

export async function saveDocumentModel(document) {
  const conn = await makeConnection(process.env.db_name);
  const model = new documentModel({ ...document });
  const savedDocument = await model.save();
  await conn.close();
  return savedDocument;
}

export async function getDocument(id) {
  const model = await documentModsel.find({ _id: id });
  return model;
}
