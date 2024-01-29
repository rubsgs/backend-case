import express from "express";
import multer from "multer";
import { documentsRouter } from "./documents/documents-controller.js";
import { userRouter } from "./users/users-controller.js";
import { loginUser } from "./users/user-service.js";
import { generateJwt } from "./common/jwt-service.js";

const app = express();
const port = process.env.port;

app.use("/documents", documentsRouter);
app.use("/users", userRouter);

app.post("/login", multer().array(), async (req, res) => {
  const { username, password } = req.body;
  const user = await loginUser({ username, password });
  if (!user) {
    res.status(401);
    res.send();
    return;
  }

  res.send({ access_token: generateJwt(user) });
});

app.listen(port, multer().array(), () => {
  console.log(`server listening on port ${port}`);
});
