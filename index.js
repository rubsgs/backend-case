import express from "express";
import multer from "multer";
import { documentsRouter } from "./documents/documents-controller.js";
import { userRouter } from "./users/users-controller.js";
import { loginUser } from "./users/user-service.js";
import { generateJwt } from "./common/jwt-service.js";

const app = express();
const port = process.env.port;
const errorHandler = (err, req, res, next) => {
  const errorStatus = err.statusCode || 500;
  const errorMessage =
    err.errorMessage || "Unknown server error when handling the request";
  res.status(errorStatus);
  res.send(errorMessage);
  console.log(err);
};

app.use("/documents", documentsRouter);
app.use("/users", userRouter);

app.post("/login", multer().array(), async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      res.status(401);
      res.send("Authorization header is required");
      return;
    }

    const [username, password] = atob(authHeader.replace("Basic ", "")).split(
      ":"
    );
    const user = await loginUser({ username, password });
    if (!user) {
    }

    res.send({ access_token: generateJwt(user) });
  } catch (e) {
    next(e);
  }
});
app.use(errorHandler);

app.listen(port, multer().array(), () => {
  console.log(`server listening on port ${port}`);
});
