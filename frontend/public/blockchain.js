// app.js

// Replace with your contract addresses
const storageSharingAddress = '0x9ecEA68DE55F316B702f27eE389D10C2EE0dde84';

// Import the ABI from the compiled contracts
const StorageSharingABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_gb",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_rate",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_socket",
				"type": "string"
			}
		],
		"name": "registerStorage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_storageId",
				"type": "uint256"
			}
		],
		"name": "releaseStorage",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_storageId",
				"type": "uint256"
			}
		],
		"name": "rentStorage",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "storageId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "gb",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "rate",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "socket",
				"type": "string"
			}
		],
		"name": "StorageRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "storageId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "consumer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "gb",
				"type": "uint256"
			}
		],
		"name": "StorageRented",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getAllStorages",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "consumer",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "gb",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "rate",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "socket",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "isAvailable",
						"type": "bool"
					}
				],
				"internalType": "struct StorageSharing.StorageInfo[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "storageCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "storages",
		"outputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "consumer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "gb",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "rate",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "socket",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "isAvailable",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let web3;
let accounts;
let storageSharing;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        accounts = await web3.eth.getAccounts();

        // Initialize the contract
        storageSharing = new web3.eth.Contract(StorageSharingABI, storageSharingAddress);
    } else {
        alert('Please install MetaMask to use this app');
    }
});

// Register a provider
document.getElementById('providerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const availableSpace = document.getElementById('availableSpace').value;
    const pricePerMB = document.getElementById('pricePerMB').value;
    const socket = document.getElementById('socket').value;

    try {
        await storageSharing.methods.registerStorage(availableSpace, pricePerMB, socket).send({ from: accounts[0] });
        document.getElementById('providerMessage').innerText = 'Provider registered successfully!';
    } catch (error) {
        document.getElementById('providerMessage').innerText = 'Error registering provider: ' + error.message;
    }
});

// Rent a storage
document.getElementById('consumerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const storageId = document.getElementById('storageId').value;

    try {
        await storageSharing.methods.rentStorage(storageId).send({ from: accounts[0], value: web3.utils.toWei("1", "ether") });
        document.getElementById('consumerMessage').innerText = 'Storage rented successfully!';
    } catch (error) {
        document.getElementById('consumerMessage').innerText = 'Error renting storage: ' + error.message;
    }
});