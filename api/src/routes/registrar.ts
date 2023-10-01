import express from "express";
import * as formidable from "formidable";
import crypto from "crypto";
import fs from "fs";

const route = express.Router();

route.post("/register", async (req, res, next) => {
  // compute file hash

  const form = new formidable.IncomingForm({
    maxFiles: 1,
    maxFields: 2,
    allowEmptyFiles: false,
  });

  const [fields, files] = await form.parse(req);

  const file = files.file![0] as unknown as formidable.File;

  const readStream = fs.createReadStream(file.filepath);

  // Criar um hash SHA-256
  const hash = crypto.createHash("sha256");

  // Atualize o hash com o conteúdo do arquivo
  readStream.on("data", (chunk) => {
    hash.update(chunk);
  });

  readStream.on("close", () => {
    // Finalize o hash e obtenha a representação hexadecimal
    const hashHex = hash.digest("hex");

    // TODO send to blockchain
    res.json({ fileHash: hashHex, txid: "" });
  });
});

route.get("/:hash", (req, res) => {
  return res.json({ ok: 1 });
});

export { route as registryRouter };
