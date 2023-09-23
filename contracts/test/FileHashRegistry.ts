import { expect } from "chai";
import { ethers } from "hardhat";

describe("FileHashRegistry", function () {
  let FileHashRegistry;
  let fileHashRegistry;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    FileHashRegistry = await ethers.getContractFactory("FileHashRegistry");
    fileHashRegistry = await FileHashRegistry.deploy();
    await fileHashRegistry.deployed();
  });

  it("Should register a file hash", async function () {
    const fileHash =
      "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
    const fileName = "test.txt";
    const fileSize = 1000;

    await fileHashRegistry
      .connect(addr1)
      .registerFileHash(fileHash, fileName, fileSize);

    const entry = await fileHashRegistry.fileEntries(fileHash);
    expect(entry.fileName).to.equal(fileName);
    expect(entry.fileSize).to.equal(fileSize);
    expect(entry.sender).to.equal(addr1.address);
  });

  it("Should not allow duplicate file hashes", async function () {
    const fileHash =
      "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
    const fileName = "test.txt";
    const fileSize = 1000;

    await fileHashRegistry
      .connect(addr1)
      .registerFileHash(fileHash, fileName, fileSize);

    // Try to register the same file hash again
    await expect(
      fileHashRegistry
        .connect(addr2)
        .registerFileHash(fileHash, fileName, fileSize)
    ).to.be.revertedWith("Hash already exists");
  });

  it("Should return the correct number of file hashes", async function () {
    const fileHash1 =
      "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
    const fileHash2 =
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890";
    const fileName1 = "test1.txt";
    const fileName2 = "test2.txt";
    const fileSize = 1000;

    await fileHashRegistry
      .connect(addr1)
      .registerFileHash(fileHash1, fileName1, fileSize);
    await fileHashRegistry
      .connect(addr1)
      .registerFileHash(fileHash2, fileName2, fileSize);

    const count = await fileHashRegistry.getFileHashesCount();
    expect(count).to.equal(2);
  });

  it("Should return the correct file hash at index", async function () {
    const fileHash1 =
      "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
    const fileHash2 =
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890";
    const fileName1 = "test1.txt";
    const fileName2 = "test2.txt";
    const fileSize = 1000;

    await fileHashRegistry
      .connect(addr1)
      .registerFileHash(fileHash1, fileName1, fileSize);
    await fileHashRegistry
      .connect(addr1)
      .registerFileHash(fileHash2, fileName2, fileSize);

    const hashAtIndex1 = await fileHashRegistry.getFileHashAtIndex(0);
    const hashAtIndex2 = await fileHashRegistry.getFileHashAtIndex(1);

    expect(hashAtIndex1).to.equal(fileHash1);
    expect(hashAtIndex2).to.equal(fileHash2);
  });
});
