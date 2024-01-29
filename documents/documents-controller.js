import { Router } from "express";
import multer from "multer";
import {
  saveDocument,
  validateDocument,
  getDocument,
  findDocuments,
  updateDocument,
} from "./document-service.js";
import { verifyUserMiddleware } from "../common/verify-user-middleware.js";

const router = Router();
const multerMiddleware = multer();

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
  try {
    const { categories } = req.query;
    if (!Array.isArray(categories)) {
      res.status(400);
      res.send("categories must be an array of strings");
    }
    const documents = await findDocuments(categories);
    if (!documents || documents.length === 0) res.status(404);
    res.send(documents);
  } catch (e) {
    next(e);
  }
});

router.get("/:uuid", verifyUserMiddleware, async (req, res) => {
  try {
    const document = await getDocument(req.params.uuid);
    if (!document) res.status(404);
    res.send(document);
  } catch (e) {
    next(e);
  }
});

router.post(
  "/",
  multerMiddleware.single("file"),
  verifyUserMiddleware,
  async (req, res) => {
    try {
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
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  "/:uuid",
  multerMiddleware.single("file"),
  verifyUserMiddleware,
  async (req, res) => {
    try {
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
    } catch (e) {
      next(e);
    }
  }
);

export const documentsRouter = router;
