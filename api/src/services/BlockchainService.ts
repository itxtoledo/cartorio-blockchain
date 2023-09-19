import { ethers } from "ethers";
import { env } from "../env";

export class BlockchainService {
  constructor() {
    const provider = new ethers.JsonRpcProvider(env.RPC_URL);
  }
}
