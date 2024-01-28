import mongoose from "mongoose";

const { db_host, db_username, db_password, db_port, db_authsource } =
  process.env;

export async function makeConnection(dbName) {
  const authSource = db_authsource !== undefined ? db_authsource : dbName;
  const connectionString = `mongodb://${db_username}:${db_password}@${db_host}:${db_port}/${dbName}`;

  return await mongoose.connect(connectionString, { authSource });
}
