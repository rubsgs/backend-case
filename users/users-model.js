import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    username: String,
    password: String,
    salt: String,
  },
  { collection: "Users" }
);

export const userModel = mongoose.model("User", schema);
