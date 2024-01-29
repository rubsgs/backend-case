import jwt from "jsonwebtoken";

const jwtSalt = process.env.hash_salt;

export function generateJwt(user) {
  const { _id, username } = user;
  const payload = { _id, username };
  return jwt.sign(payload, jwtSalt, { expiresIn: "1h" });
}

export function authenticateToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSalt, (err, user) => {
      if (err) resolve(false);
      resolve(user);
    });
  });
}
