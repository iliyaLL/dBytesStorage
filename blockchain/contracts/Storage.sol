// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./StorageToken.sol";

contract Storage {
    StorageToken public storageToken;
    address public owner;

    struct StorageUnit {
        uint256 size; // Size of the storage in GB
        uint256 rate; // Rate per GB for the consumer
        address owner;
        address consumer;
    }

    mapping(address => StorageUnit) public storageUnits; // Mapping to track storage units for providers

    event StorageRegistered(
        address indexed provider,
        uint256 size,
        uint256 rate
    );
    event StorageRented(
        address indexed consumer,
        address indexed provider,
        uint256 amount
    );

    constructor(StorageToken _storageToken) {
        storageToken = _storageToken;
        owner = msg.sender;
    }

    // Function for the provider to register their available storage
    function registerStorage(uint256 size, uint256 rate) external {
        require(size > 0, "Size must be greater than zero");
        require(rate > 0, "Rate must be greater than zero");

        storageUnits[msg.sender] = StorageUnit(
            size,
            rate,
            msg.sender,
            address(0)
        );
        emit StorageRegistered(msg.sender, size, rate);
    }

    // Function to rent storage from the provider
    function rentStorage(address provider) external {
        StorageUnit storage unit = storageUnits[provider];

        require(unit.consumer == address(0), "Storage is already rented");

        uint256 totalCost = unit.rate;
        require(
            storageToken.balanceOf(msg.sender) >= totalCost,
            "Insufficient funds"
        );

        storageToken.transferFrom(msg.sender, provider, totalCost);
        unit.consumer = msg.sender;

        emit StorageRented(msg.sender, provider, totalCost);
    }

    // Function to get storage details for a provider
    function getStorageDetails(
        address provider
    ) external view returns (StorageUnit memory) {
        return storageUnits[provider];
    }
}
