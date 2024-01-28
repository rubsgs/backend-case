import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: String,
    originalName: String,
    content: Buffer,
    verificationDigest: String,
    type: String,
    version: Number,
    uuid: String,
    categories: [String],
  },
  { collection: "Documents" }
);

export const documentModel = mongoose.model("Document", schema);
