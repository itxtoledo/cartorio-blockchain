import { encodeBytes32String, ethers, hashMessage } from "ethers";
import { env } from "../env";
import { FileHashRegistryABI } from "../static/FileHashRegistryABI";

export class BlockchainService {
  private contract!: ethers.Contract;

  constructor() {
    const provider = new ethers.JsonRpcProvider(env.RPC_URL);
    this.instantiateContract(provider);
  }

  private async instantiateContract(provider: ethers.JsonRpcProvider) {
    const signer = await provider.getSigner();

    this.contract = new ethers.Contract(
      env.CONTRACT,
      FileHashRegistryABI,
      signer
    );
  }

  public async registerFileHash(
    fileHash: string,
    fileName: string,
    fileSize: number
  ) {
    const res = await this.contract.registerFileHash(
      encodeBytes32String(fileHash),
      fileName,
      fileSize
    );

    return res;
  }

  public async getFileEntryByHash(fileHash: string) {
    const res = await this.contract.getFileEntryByHash(
      encodeBytes32String(fileHash)
    );

    return res;
  }
}
