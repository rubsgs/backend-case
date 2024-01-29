import { userModel } from "./users-model.js";
import { makeConnection } from "../common/connection-factory.js";

export async function saveUserModel(user) {
  const conn = await makeConnection(process.env.db_name);
  const model = new userModel({ ...user });
  const savedUser = await model.save();

  await conn.connection.close();
  return savedUser;
}

export async function getUserModel(findUser) {
  const conn = await makeConnection(process.env.db_name);
  const user = await userModel.findOne(findUser);
  await conn.connection.close();

  return user;
}
