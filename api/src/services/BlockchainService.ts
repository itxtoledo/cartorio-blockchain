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
    const signer = new ethers.Wallet(env.PRIVATE_KEY, provider);

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
      encodeBytes32String(fileName),
      fileSize
    );

    console.log("registerFileHash", res);

    return res;
  }

  public async getFileEntryByHash(fileHash: string) {
    const res = await this.contract.getFileEntryByHash(fileHash);

    return {
      fileName: res[0] as string,
      fileSize: (res[1] as BigInt).toString(),
      timestamp: (res[2] as BigInt).toString(),
      blockNumber: (res[3] as BigInt).toString(),
    };
  }
}
