import { saveDocumentModel, getDocument } from "./document-repository";
import { fileTypeFromBuffer } from "file-type";

export async function saveDocument(document) {
  const fileBuffer = Buffer.from(document.content);
  const fileType = fileTypeFromBuffer(fileBuffer);
  if (!fileType) throw new Error(`Couldn't detect file type`);

  const savedDocument = await saveDocumentModel({
    ...document,
    type: fileType.mime,
  });
  return savedDocument;
}
