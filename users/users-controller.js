import { Router } from "express";
import { saveUser } from "./user-service.js";
import multer from "multer";

const router = Router();

router.post("/", multer().array(), async (req, res) => {
  const { username, password } = req.body;
  const user = await saveUser({ username, password });

  if (user) res.status(200);
  else res.status(401);

  res.send();
});

export const userRouter = router;
