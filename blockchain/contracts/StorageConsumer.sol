// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./Storage.sol";
import "./StorageToken.sol";

contract StorageConsumer {
    Storage public storageContract;

    constructor(Storage _storageContract) {
        storageContract = _storageContract;
    }

    // Function to rent storage from a provider
    function rentStorage(address provider) external {
        storageContract.rentStorage(provider);
    }

    // Function to get the storage details of a specific provider
    function getProviderStorageDetails(
        address provider
    ) external view returns (Storage.StorageUnit memory) {
        return storageContract.getStorageDetails(provider);
    }

    // Function to check balance of StorageToken
    function getTokenBalance() external view returns (uint256) {
        StorageToken token = StorageToken(
            address(storageContract.storageToken())
        );
        return token.balanceOf(msg.sender);
    }
}
