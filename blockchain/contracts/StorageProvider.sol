// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./Storage.sol";
import "./StorageToken.sol";

contract StorageProvider {
    Storage public storageContract;

    constructor(Storage _storageContract) {
        storageContract = _storageContract;
    }

    // Function for the provider to register their storage
    function registerStorage(uint256 size, uint256 rate) external {
        storageContract.registerStorage(size, rate);
    }

    // Function to get storage details
    function getMyStorageDetails() external view returns (Storage.StorageUnit memory) {
        return storageContract.getStorageDetails(msg.sender);
    }
}
