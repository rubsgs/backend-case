import crypto from "crypto";
import { getUserModel, saveUserModel } from "./users-repository.js";

function hashPassword(password, userSalt) {
  const salt = userSalt || crypto.randomBytes(16).toString("hex");
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return { hashedPassword, salt };
}

export async function saveUser(user) {
  const { username, password: originalPassword } = user;
  const { hashedPassword: password, salt } = hashPassword(originalPassword);

  try {
    const user = await saveUserModel({ username, password, salt });
    return !!user;
  } catch (e) {
    console.trace(e);
    return false;
  }
}

export async function loginUser(user) {
  const { username, password } = user;
  const existingUser = await getUserModel({ username });
  if (!existingUser) return;

  const { salt, password: existingPassword } = existingUser;
  const { hashedPassword: calculatedPassword } = hashPassword(password, salt);

  return calculatedPassword === existingPassword ? existingUser : null;
}

export async function getUser(user) {
  const existingUser = await getUserModel(user);
  return existingUser;
}
