import express from "express";
import { FileRepository } from "../repositories/FileRepository";

export class RegistrarController {
  private fileRepository: FileRepository;
  constructor() {
    this.fileRepository = new FileRepository();
  }

  async registerDocument(req: express.Request, res: express.Response) {
    const [file, fileHash] = await this.fileRepository.getFileHash(req);

    const fileData = await res.locals.di.blockchainService.registerFileHash(
      fileHash,
      file.originalFilename!,
      file.size
    );

    return res.json({
      txid: fileData.txid,
      block: fileData.block,
      fileHash,
    });
  }

  async checkDocument(req: express.Request, res: express.Response) {
    const [, fileHash] = await this.fileRepository.getFileHash(req);

    const fileData = await res.locals.di.blockchainService.getFileEntryByHash(
      fileHash
    );

    return res.json({
      exists: fileData.fileName != "",
    });
  }

  async getDocumentDetails(req: express.Request, res: express.Response) {
    const fileHash = req.params.hash;

    const fileData = await res.locals.di.blockchainService.getFileEntryByHash(
      fileHash
    );

    return res.json(fileData);
  }
}
