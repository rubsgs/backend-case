import mongoose from "mongoose";
import { documentModel } from "./document.model.js";
import { makeConnection } from "../common/connection-factory.js";

export async function saveDocumentModel(document) {
  const conn = await makeConnection(process.env.db_name);
  const model = new documentModel({ ...document });
  const savedDocument = await model.save();

  await conn.connection.close();
  return savedDocument;
}

export async function getDocumentModel(uuid) {
  const conn = await makeConnection(process.env.db_name);
  const model = await documentModel
    .findOne({
      uuid,
    })
    .sort({ version: -1 });
  await conn.connection.close();
  return model;
}

export async function findDocumentModels(categories) {
  const conn = await makeConnection(process.env.db_name);

  const models = await documentModel
    .where("categories")
    .in([...categories])
    .exec();
  await conn.connection.close();
  return models;
}
