const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const StorageModule = buildModule("StorageModule", (m) => {
    const storage = m.contract("Storage", ["0x5FbDB2315678afecb367f032d93F642f64180aa3"]);

    return { storage };
});

module.exports = StorageModule;
