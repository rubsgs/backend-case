import { Schema, Model, String, Buffer } from "mongoose";

const schema = new Schema({
  filename: String,
  content: Buffer,
  verificationDigest: String,
  type: String,
});

export const documentModel = Model("Document", schema);
