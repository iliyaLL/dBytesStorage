const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StorageToken", function () {
    let storageToken, owner;

    beforeEach(async function () {
        const StorageToken = await ethers.getContractFactory("StorageToken");

        [owner] = await ethers.getSigners();

        storageToken = await StorageToken.deploy();
    });

    it("Should assign the total supply of tokens to the owner", async function () {
        // Check the owner's balance (should be the total supply)
        const ownerBalance = await storageToken.balanceOf(owner.address);

        // Check if the total supply matches the owner's balance
        expect(await storageToken.totalSupply()).to.equal(ownerBalance);
    });
});
