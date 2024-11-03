const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Storage Contract", function () {
    let Storage;
    let storage;
    let StorageToken;
    let storageToken;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        StorageToken = await ethers.getContractFactory("StorageToken");
        storageToken = await StorageToken.deploy();
        await storageToken.waitForDeployment();

        Storage = await ethers.getContractFactory("Storage");
        storage = await Storage.deploy(storageToken.getAddress());
        await storage.waitForDeployment();

        // Mint tokens to addr1 and addr2 for testing payments
        await storageToken.transfer(addr1.getAddress(), ethers.parseEther("1000"));
        await storageToken.transfer(addr2.getAddress(), ethers.parseEther("1000"));
    });

    it("should register a storage", async function () {
        await storage.connect(addr1).registerStorage(100, 10, "socket-addr-1");

        const storageInfo = await storage.storages(1);
        expect(storageInfo.owner).to.equal(await addr1.getAddress());
        expect(storageInfo.gb).to.equal(100);
        expect(storageInfo.rate).to.equal(10);
        expect(storageInfo.isAvailable).to.equal(true);
    });

    it("should list all storages", async function () {
        await storage.connect(addr1).registerStorage(100, 10, "socket-addr-1");
        await storage.connect(addr2).registerStorage(50, 20, "socket-addr-2");

        const allStorages = await storage.getAllStorages();
        expect(allStorages.length).to.equal(2);
        expect(allStorages[0].owner).to.equal(await addr1.getAddress());
        expect(allStorages[1].owner).to.equal(await addr2.getAddress());
    });

    it("should allow a user to rent storage", async function () {
        await storage.connect(addr1).registerStorage(100, 10, "socket-addr-1");
        await storageToken.connect(addr2).approve(await storage.getAddress(), ethers.parseEther("1000"));

        await storage.connect(addr2).rentStorage(1, 50);
        const storageInfo = await storage.storages(1);

        expect(storageInfo.consumer).to.equal(await addr2.getAddress());
        expect(storageInfo.gb).to.equal(50); // 100 - 50 rented
        expect(storageInfo.isAvailable).to.equal(true);
    });

    it("should release rented storage", async function () {
        await storage.connect(addr1).registerStorage(100, 10, "socket-addr-1");
        await storageToken.connect(addr2).approve(await storage.getAddress(), ethers.parseEther("1000"));
        await storage.connect(addr2).rentStorage(1, 50);

        await storage.connect(addr2).releaseStorage(1);
        const storageInfo = await storage.storages(1);

        expect(storageInfo.consumer).to.equal(ethers.ZeroAddress);
        expect(storageInfo.isAvailable).to.equal(true);
    });

    it("should revert rent if storage is insufficient", async function () {
        await storage.connect(addr1).registerStorage(20, 10, "socket-addr-1");
        await storageToken.connect(addr2).approve(await storage.getAddress(), ethers.parseEther("1000"));

        await expect(storage.connect(addr2).rentStorage(1, 50)).to.be.revertedWith("Insufficient storage available");
    });
});
