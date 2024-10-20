// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./StorageProvider.sol";
import "./StorageToken.sol";

contract StorageConsumer {
    StorageProvider storageProvider;
    StorageToken storageToken;

    struct File {
        address consumerAddress;
        uint256 fileSize;
        uint256 paidAmount;
        uint256 storedAt;
        bool isStored;
    }

    mapping(address => File[]) public storedFiles;

    event FileStored(address indexed consumer, uint256 fileSize, uint256 paidAmount, address provider);

    constructor(address _storageProvider, address _storageToken) {
        storageProvider = StorageProvider(_storageProvider);
        storageToken = StorageToken(_storageToken);
    }

    function storeFile(address _provider, uint256 _fileSize) external {
        StorageProvider.Provider memory provider = storageProvider.getProvider(_provider);
        require(provider.availableSpace >= _fileSize, "Not enough available space");

        uint256 totalCost = provider.pricePerMB * _fileSize;
        require(storageToken.balanceOf(msg.sender) >= totalCost, "Insufficient tokens");

        storageToken.transferFrom(msg.sender, _provider, totalCost);

        storedFiles[msg.sender].push(File({
            consumerAddress: msg.sender,
            fileSize: _fileSize,
            paidAmount: totalCost,
            storedAt: block.timestamp,
            isStored: true
        }));

        emit FileStored(msg.sender, _fileSize, totalCost, _provider);
    }

    function getStoredFiles(address _consumer) external view returns (File[] memory) {
        return storedFiles[_consumer];
    }
}
