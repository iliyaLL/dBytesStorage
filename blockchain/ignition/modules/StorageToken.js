const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const TokenModule = buildModule("TokenModule", (m) => {
    const storageToken = m.contract("StorageToken");

    return { storageToken };
});

module.exports = TokenModule;
