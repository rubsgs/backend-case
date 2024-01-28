import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  originalName: String,
  content: Buffer,
  verificationDigest: String,
  type: String,
});

export const documentModel = mongoose.model("Document", schema);
