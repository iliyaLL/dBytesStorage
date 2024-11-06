const fs = require('fs');
const path = require('path');

async function main() {
    const StorageSharing = await ethers.getContractFactory("StorageSharing");
    const storage = await StorageSharing.deploy();
    await storage.waitForDeployment();
    const storageAddress = await storage.getAddress();
    console.log("StorageSharing contract deployed to:", storageAddress);

    const deploymentInfo = {
        storageSharing: {
            address: storageAddress,
            abi: JSON.parse(fs.readFileSync(path.resolve(__dirname, "./../artifacts/contracts/Storage.sol/Storage.json"), "utf8")).abi,
        },
    };
    const pathToFile = path.join(__dirname, 'deployment-info.json');

    fs.writeFileSync(pathToFile, JSON.stringify(deploymentInfo, null, 2));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
