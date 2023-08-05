pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract FileHashRegistry is AccessControl {
    using EnumerableSet for EnumerableSet.Bytes32Set;

    struct FileEntry {
        string fileName;
        uint256 fileSize;
        uint256 timestamp;
        address sender;
        uint256 blockNumber;
    }

    EnumerableSet.Bytes32Set private hashes;

    bytes32 public constant REGISTRAR_ROLE = keccak256("REGISTRAR_ROLE");

    mapping(bytes32 => FileEntry) public fileEntries;

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function registerFileHash(
        bytes32 fileHash,
        string memory fileName,
        uint256 fileSize
    ) public onlyRole(REGISTRAR_ROLE) {
        require(!hashes.contains(fileHash), "Hash already exists");

        FileEntry memory newEntry = FileEntry({
            fileName: fileName,
            fileSize: fileSize,
            timestamp: block.timestamp,
            sender: msg.sender,
            blockNumber: block.number
        });

        fileEntries[fileHash] = newEntry;
        hashes.add(fileHash);
    }

    function getFileHashesCount() public view returns (uint256) {
        return hashes.length();
    }

    function getFileHashAtIndex(uint256 index) public view returns (bytes32) {
        require(index < hashes.length(), "Index out of bounds");
        return hashes.at(index);
    }
}
