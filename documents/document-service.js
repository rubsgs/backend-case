import {
  saveDocumentModel,
  getDocumentModel,
  findDocumentModels,
} from "./document-repository.js";
import { fileTypeFromBuffer } from "file-type";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

export async function validateDocument(document) {
  const {
    type: originalType,
    content,
    verificationDigest: expectedDigest,
  } = document;
  const fileBuffer = Buffer.from(content);
  const calculatedDigest = crypto
    .createHash("sha256")
    .update(fileBuffer, "base64")
    .digest("hex")
    .toString("base64");

  if (calculatedDigest !== expectedDigest)
    throw new Error("Uploaded file is corrupted");

  const fileType = await fileTypeFromBuffer(fileBuffer);
  if (!fileType) throw new Error(`Couldn't detect file type`);
  if (fileType.mime !== originalType)
    throw new Error(`File type doesn't match it's extension`);

  return fileType.mime;
}

export async function saveDocument(document, uuid, version) {
  const savedDocument = await saveDocumentModel({
    ...document,
    version: version || 1,
    uuid: uuid || uuidv4(),
  });
  return savedDocument;
}

export async function getDocument(uuid) {
  const document = await getDocumentModel(uuid);
  return document;
}

export async function findDocuments(categories) {
  const documents = await findDocumentModels(categories);
  return documents;
}

export async function updateDocument(uuid, document) {
  const existingDocument = await getDocument(uuid);
  if (!existingDocument) return;

  const { version } = existingDocument;
  const newDocument = await saveDocument(document, uuid, version + 1);
  return newDocument;
}
