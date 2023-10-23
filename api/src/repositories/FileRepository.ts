import * as formidable from "formidable";
import crypto from "crypto";
import fs from "fs";
import express from "express";

export class FileRepository {
  public async getFileHash(
    req: express.Request
  ): Promise<[formidable.File, string, string]> {
    const form = new formidable.IncomingForm({
      maxFiles: 1,
      maxFields: 2,
      allowEmptyFiles: false,
    });

    const [, files] = await form.parse(req);

    const file = files.file![0] as unknown as formidable.File;

    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(file.filepath);
      const hash = crypto.createHash("sha256");

      readStream.on("data", (chunk) => {
        hash.update(chunk);
      });

      readStream.on("end", () => {
        resolve([
          file,
          `0x${hash.digest("hex")}`,
          `0x${crypto
            .createHash("sha256")
            .update(file.originalFilename!)
            .digest("hex")}`,
        ]);
      });

      readStream.on("error", (error) => {
        reject(error);
      });
    });
  }
}
