// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract StorageSharing {
    struct StorageInfo {
        address owner;
        address consumer;
        uint256 gb;
        uint256 rate;
        string socket;
        bool isAvailable;
    }

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

    function rentStorage(uint256 _storageId) public payable {
        StorageInfo storage storageInfo = storages[_storageId];

        require(storageInfo.isAvailable, "Storage is not available");

        uint256 paymentAmount = storageInfo.gb * storageInfo.rate;
        require(msg.value >= paymentAmount, "Insufficient Ether sent");

        payable(storageInfo.owner).transfer(paymentAmount);

        storageInfo.consumer = msg.sender;

        storageInfo.isAvailable = false;

        emit StorageRented(_storageId, msg.sender, storageInfo.gb);

        if (msg.value > paymentAmount) {
            payable(msg.sender).transfer(msg.value - paymentAmount);
        }
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
