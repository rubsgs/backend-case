import { Router } from "express";
import { saveUser } from "./user-service.js";
import multer from "multer";
import { verifyUserMiddleware } from "../common/verify-user-middleware.js";

const router = Router();

router.post(
  "/",
  multer().array(),
  verifyUserMiddleware,
  async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await saveUser({ username, password });

      if (user) res.status(200);
      else res.status(401);

      res.send();
    } catch (e) {
      next(e);
    }
  }
);

router.post("/seed", multer().array(), async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await saveUser({ username, password });

    if (user) res.status(200);
    else res.status(401);

    res.send();
  } catch (e) {
    next(e);
  }
});

export const userRouter = router;
