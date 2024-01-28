import { Router } from 'express';
import multer from 'multer';
import { saveDocument, validateDocument } from './document-service.js';

const router = Router();
const multerMiddleware= multer()

router.get('/:id', async (req, res) => {
  console.log('aaa');
  res.send({ teste: 'teste' });
});

router.post('/', multerMiddleware.single('file'), async (req, res) => {
  const {file, name, digest} = req;
  const {originalname, mimetype: originalType, buffer} = file;
  const document = {
    content: buffer,
    type: originalType,
    originalName: originalname,
    name
  };

  let fileType;
  try {
    fileType = await validateDocument(document)
  } catch(e) {
    res.send(e.message);
    res.status(400);
    return;
  }
  const savedDocument = await saveDocument({
    ...document,
    type: fileType
  })
  res.send(savedDocument);
});

export const socumentsRouter = router;
