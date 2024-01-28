import mongoose from 'mongoose';

const { db_host, db_username, db_password, db_port, db_name } = process.env;

export async function makeConnection(dbName) {
  const connectionString = `mongodb://${db_username}:${db_password}@${db_host}:${db_port}/${dbName}`;
  console.log(connectionString)
  return await mongoose.createConnection(connectionString).asPromise();
}