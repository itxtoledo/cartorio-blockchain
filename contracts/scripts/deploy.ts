import { ethers } from "hardhat";

async function main() {
  const FileHashRegistry = await ethers.deployContract("FileHashRegistry");

  await FileHashRegistry.waitForDeployment();

  console.log(`FileHashRegistry deployed to ${FileHashRegistry.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
