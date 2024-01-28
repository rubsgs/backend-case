import { Router } from "express";

const router = Router();

router.get("/:id", async (req, res) => {
  console.log("aaa");
  res.send({ teste: "teste" });
});

router.post("/", async (req, res) => {
  console.log(req);
  res.send({});
});

export const socumentsRouter = router;
