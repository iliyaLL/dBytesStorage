// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./StorageToken.sol";

contract Storage {
    struct StorageInfo {
        address owner;
        address consumer;
        uint256 gb;
        uint256 rate;
        string socket;
        bool isAvailable;
    }

    StorageToken public storageToken;
    mapping(uint256 => StorageInfo) public storages;
    uint256 public storageCount;

    event StorageRegistered(
        uint256 indexed storageId,
        address indexed owner,
        uint256 gb,
        uint256 rate,
        string socket
    );
    event StorageRented(
        uint256 indexed storageId,
        address indexed consumer,
        uint256 gb
    );

    constructor(StorageToken _storageToken) {
        storageToken = _storageToken;
    }

    function registerStorage(
        uint256 _gb,
        uint256 _rate,
        string memory _socket
    ) public {
        storageCount++;
        storages[storageCount] = StorageInfo({
            owner: msg.sender,
            consumer: address(0),
            gb: _gb,
            rate: _rate,
            socket: _socket,
            isAvailable: true
        });

        emit StorageRegistered(storageCount, msg.sender, _gb, _rate, _socket);
    }

    function rentStorage(uint256 _storageId, uint256 _gb) public {
        StorageInfo storage storageInfo = storages[_storageId];

        require(storageInfo.isAvailable, "Storage is not available");
        require(storageInfo.gb >= _gb, "Insufficient storage available");

        uint256 paymentAmount = _gb * storageInfo.rate;
        require(
            storageToken.transferFrom(
                msg.sender,
                storageInfo.owner,
                paymentAmount
            ),
            "Payment failed"
        );

        storageInfo.consumer = msg.sender;
        storageInfo.gb -= _gb;

        if (storageInfo.gb == 0) {
            storageInfo.isAvailable = false;
        }

        emit StorageRented(_storageId, msg.sender, _gb);
    }

    function releaseStorage(uint256 _storageId) public {
        StorageInfo storage storageInfo = storages[_storageId];

        require(
            msg.sender == storageInfo.consumer,
            "Only the consumer can release storage"
        );

        storageInfo.consumer = address(0);
        storageInfo.isAvailable = true;
    }

    function getAllStorages() public view returns (StorageInfo[] memory) {
        StorageInfo[] memory availableStorages = new StorageInfo[](
            storageCount
        );
        uint256 counter = 0;

        for (uint256 i = 1; i <= storageCount; i++) {
            availableStorages[counter] = storages[i];
            counter++;
        }

        return availableStorages;
    }
}
