import express from "express";
import { socumentsRouter } from "./documents/documents-controller.js";

const app = express();
const port = process.env.port;

app.use("/documents", socumentsRouter);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
