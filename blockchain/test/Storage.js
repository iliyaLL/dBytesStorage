const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Storage", function () {
    let storage, storageToken, provider;

    beforeEach(async function () {
        const StorageToken = await ethers.getContractFactory("StorageToken");
        const Storage = await ethers.getContractFactory("Storage");

        [provider] = await ethers.getSigners();

        storageToken = await StorageToken.deploy();
        await storageToken.waitForDeployment();

        storage = await Storage.deploy(storageToken.getAddress());
    });

    it("Should allow provider to register storage", async function () {
        // Register 100 GB with a rate of 10 tokens per GB
        await storage.connect(provider).registerStorage(100, 10);

        // Fetch storage details for the provider
        const storageDetails = await storage.getStorageDetails(provider.address);

        // Verify the registered storage details
        expect(storageDetails.size).to.equal(100);
        expect(storageDetails.rate).to.equal(10);
        expect(storageDetails.owner).to.equal(provider.address);
    });
});
