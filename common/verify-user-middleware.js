import { authenticateToken } from "../common/jwt-service.js";
import { getUser } from "../users/user-service.js";

export const verifyUserMiddleware = async (req, res, next) => {
  const jwt = req.header("Authorization");
  if (!jwt) {
    res.status(401);
    res.send();
    return;
  }

  const user = await authenticateToken(jwt.replace("Bearer ", ""));
  if (!user) {
    res.status(401);
    res.send();
    return;
  }

  const { username, _id } = user;
  const validateUser = await getUser({ username, _id });
  if (!validateUser) {
    res.status(401);
    res.send();
    return;
  }
  next();
};
