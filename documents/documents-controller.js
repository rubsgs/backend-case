import { Router } from "express";
import multer from "multer";
import {
  saveDocument,
  validateDocument,
  getDocument,
  findDocuments,
  updateDocument,
} from "./document-service.js";
import { authenticateToken } from "../common/jwt-service.js";
import { getUser } from "../users/user-service.js";

const router = Router();
const multerMiddleware = multer();
const verifyUserMiddleware = async (req, res, next) => {
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

function documentFromRequest(req) {
  const {
    file: { originalname, mimetype: originalType, buffer },
    body: { name, digest: verificationDigest, categories },
  } = req;
  const document = {
    content: buffer,
    type: originalType,
    originalName: originalname,
    categories,
    name,
    verificationDigest,
  };

  return document;
}

router.get("/", verifyUserMiddleware, async (req, res) => {
  const { categories } = req.query;
  if (!Array.isArray(categories)) {
    res.status(400);
    res.send("categories must be an array of strings");
  }
  const documents = await findDocuments(categories);
  if (!documents || documents.length === 0) res.status(404);
  res.send(documents);
});

router.get("/:uuid", verifyUserMiddleware, async (req, res) => {
  const document = await getDocument(req.params.uuid);
  if (!document) res.status(404);
  res.send(document);
});

router.post(
  "/",
  multerMiddleware.single("file"),
  verifyUserMiddleware,
  async (req, res) => {
    const document = documentFromRequest(req);
    let fileType;
    try {
      fileType = await validateDocument(document);
    } catch (e) {
      res.send(e.message);
      res.status(400);
      return;
    }
    const savedDocument = await saveDocument({
      ...document,
      type: fileType,
    });
    res.send(savedDocument);
  }
);

router.put(
  "/:uuid",
  multerMiddleware.single("file"),
  verifyUserMiddleware,
  async (req, res) => {
    const document = documentFromRequest(req);
    const { uuid } = req.params;

    let fileType;
    try {
      fileType = await validateDocument(document);
    } catch (e) {
      res.send(e.message);
      res.status(400);
      return;
    }
    const savedDocument = await updateDocument(uuid, {
      ...document,
      type: fileType,
    });
    res.send(savedDocument);
  }
);

export const documentsRouter = router;
