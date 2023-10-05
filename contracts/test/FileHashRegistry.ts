import { expect } from "chai";
import { ethers } from "hardhat";
import { FileHashRegistry } from "../typechain-types";

describe("FileHashRegistry", () => {
  let fileHashRegistry: FileHashRegistry;

  beforeEach(async () => {
    const FileHashRegistryFactory = await ethers.getContractFactory(
      "FileHashRegistry"
    );
    fileHashRegistry = await FileHashRegistryFactory.deploy();
  });

  const registerFile = async (fileName: string, fileSize: number) => {
    const fileHash = ethers.encodeBytes32String(fileName);
    await fileHashRegistry.registerFileHash(fileHash, fileName, fileSize);
    return fileHash;
  };

  it("should register a file hash", async () => {
    const fileName = "test.txt";
    const fileSize = 100;

    const fileHash = await registerFile(fileName, fileSize);

    const fileEntry = await fileHashRegistry.getFileEntryByHash(fileHash);

    expect(fileEntry[0]).to.equal(fileName);
    expect(fileEntry[1]).to.equal(fileSize);
    expect(fileEntry[2]).to.be.above(0);
    expect(fileEntry[3]).to.be.above(0);
  });

  it("should return correct files count", async () => {
    const initialCount = await fileHashRegistry.getFilesCount();

    const fileName = "test.txt";
    const fileSize = 100;

    await registerFile(fileName, fileSize);

    const finalCount = await fileHashRegistry.getFilesCount();

    expect(finalCount).to.equal(initialCount + 1n);
  });

  it("should revert when registering a file hash that already exists", async () => {
    const fileName = "test.txt";
    const fileSize = 100;

    await registerFile(fileName, fileSize);

    await expect(
      registerFile(fileName, fileSize)
    ).to.be.revertedWithCustomError(fileHashRegistry, "FileAlreadyRegistered");
  });
});
