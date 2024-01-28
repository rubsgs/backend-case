import { saveDocumentModel, getDocument } from "./document-repository.js";
import { fileTypeFromBuffer } from "file-type";

export async function validateDocument(document) {
  const { type: originalType } = document;
  const fileBuffer = Buffer.from(document.content);
  const fileType = await fileTypeFromBuffer(fileBuffer);
  
  if (!fileType) throw new Error(`Couldn't detect file type`);
  if(fileType.mime !== originalType) throw new Error(`File type doesn't match it's extension`);
  return fileType.mime;
}

export async function saveDocument(document) {
  const savedDocument = await saveDocumentModel(document);
  return savedDocument;
}
