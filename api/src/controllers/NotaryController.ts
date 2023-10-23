import express from "express";
import { FileRepository } from "../repositories/FileRepository";
import { ethers } from "ethers";
import { ApiError } from "../utils/errors";

export class NotaryController {
  private fileRepository: FileRepository;
  constructor() {
    this.fileRepository = new FileRepository();
  }

  async registerDocument(req: express.Request, res: express.Response) {
    const [file, fileHash, fileNameHash] =
      await this.fileRepository.getFileHash(req);

    let registryData: ethers.ContractTransactionReceipt;

    const exists = await res.locals.di.fileRegistryRepository.count({
      hash: fileHash,
    });

    if (exists > 0) {
      throw new ApiError("documento já registrado", 409);
    }

    try {
      registryData = await res.locals.di.blockchainService.registerFileHash(
        fileHash,
        fileNameHash,
        file.size
      );
    } catch (error) {
      throw new ApiError("erro ao registrar documento na blockchain", 500);
    }

    await res.locals.di.em.persistAndFlush(
      res.locals.di.fileRegistryRepository.create({
        user: res.locals.user.id,
        hash: fileHash,
        txid: registryData.hash,
      })
    );

    return res.json({
      txid: registryData.hash,
      blockNumber: registryData.blockNumber,
      fileHash,
    });
  }

  async checkDocument(req: express.Request, res: express.Response) {
    const [, fileHash] = await this.fileRepository.getFileHash(req);

    const fileData = await res.locals.di.blockchainService.getFileEntryByHash(
      fileHash
    );

    const found = await res.locals.di.fileRegistryRepository.findOne({
      hash: fileHash,
    });

    return res.json({ ...fileData, txid: found?.txid, fileHash });
  }

  async getDocumentDetails(req: express.Request, res: express.Response) {
    const fileHash = req.params.hash;

    const fileData = await res.locals.di.blockchainService.getFileEntryByHash(
      fileHash
    );

    return res.json(fileData);
  }
}
