const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const StorageModule = buildModule("StorageModule", (m) => {
    const storage = m.contract("StorageSharing");

    return { storage };
});

module.exports = StorageModule;
