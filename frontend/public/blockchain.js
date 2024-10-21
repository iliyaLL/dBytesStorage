// app.js

// Replace with your contract addresses
const storageProviderAddress = '0xf2b6ed3cc198c16f4681869678082537967951ed';
const storageTokenAddress = '0x0ddaf8bb9a088f2dd13d25cf181db8cafebd717a';
const storageConsumerAddress = '0xYourStorageConsumerAddress';

// Import the ABI from the compiled contracts
const StorageProviderABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "providerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "availableSpace",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "pricePerMB",
				"type": "uint256"
			}
		],
		"name": "ProviderRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_availableSpace",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_pricePerMB",
				"type": "uint256"
			}
		],
		"name": "registerProvider",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_providerAddress",
				"type": "address"
			}
		],
		"name": "getProvider",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "providerAddress",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "availableSpace",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pricePerMB",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "registeredAt",
						"type": "uint256"
					}
				],
				"internalType": "struct StorageProvider.Provider",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getProviderList",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
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
		"name": "providerList",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "providers",
		"outputs": [
			{
				"internalType": "address",
				"name": "providerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "availableSpace",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pricePerMB",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "registeredAt",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const StorageTokenABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
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
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
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
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
const StorageConsumerABI = [ /* ABI for StorageConsumer */ ];

let web3;
let accounts;
let storageProvider;
let storageToken;
let storageConsumer;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        accounts = await web3.eth.getAccounts();

        storageProvider = new web3.eth.Contract(StorageProviderABI, storageProviderAddress);
        storageToken = new web3.eth.Contract(StorageTokenABI, storageTokenAddress);
        storageConsumer = new web3.eth.Contract(StorageConsumerABI, storageConsumerAddress);
    } else {
        alert('Please install MetaMask to use this app');
    }
});

// Register a provider
document.getElementById('providerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const availableSpace = document.getElementById('availableSpace').value;
    const pricePerMB = document.getElementById('pricePerMB').value;

    try {
        await storageProvider.methods.registerProvider(availableSpace, pricePerMB).send({ from: accounts[0] });
        document.getElementById('providerMessage').innerText = 'Provider registered successfully!';
    } catch (error) {
        document.getElementById('providerMessage').innerText = 'Error registering provider: ' + error.message;
    }
});

// Store a file
document.getElementById('consumerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const providerAddress = document.getElementById('providerAddress').value;
    const fileSize = document.getElementById('fileSize').value;

    try {
        await storageConsumer.methods.storeFile(providerAddress, fileSize).send({ from: accounts[0] });
        document.getElementById('consumerMessage').innerText = 'File stored successfully!';
    } catch (error) {
        document.getElementById('consumerMessage').innerText = 'Error storing file: ' + error.message;
    }
});