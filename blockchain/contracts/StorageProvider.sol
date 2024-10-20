// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract StorageProvider {
    struct Provider {
        address providerAddress;
        uint256 availableSpace;
        uint256 pricePerMB;
        uint256 registeredAt;
    }

    mapping(address => Provider) public providers;
    address[] public providerList;

    // Event to log provider registration
    event ProviderRegistered(
        address indexed providerAddress,
        uint256 availableSpace,
        uint256 pricePerMB
    );

    function registerProvider(
        uint256 _availableSpace,
        uint256 _pricePerMB
    ) external {
        require(_availableSpace > 0, "Available space must be greater than 0");
        require(_pricePerMB > 0, "Price per MB must be greater than 0");

        providers[msg.sender] = Provider({
            providerAddress: msg.sender,
            availableSpace: _availableSpace,
            pricePerMB: _pricePerMB,
            registeredAt: block.timestamp
        });

        providerList.push(msg.sender);

        emit ProviderRegistered(msg.sender, _availableSpace, _pricePerMB);
    }

    function getProvider(
        address _providerAddress
    ) external view returns (Provider memory) {
        return providers[_providerAddress];
    }

    function getProviderList() external view returns (address[] memory) {
        return providerList;
    }
}
