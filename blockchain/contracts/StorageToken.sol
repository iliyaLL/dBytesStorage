// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract StorageToken is ERC20 {
    uint256 public signupBonus = 100 * 10 ** decimals();

    mapping(address => bool) public registeredUsers;

    constructor() ERC20("StorageToken", "STOR") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    function register() external {
        require(!registeredUsers[msg.sender], "User already registered");

        _mint(msg.sender, signupBonus);
        registeredUsers[msg.sender] = true;
    }
}
