const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractABI = [
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
]

let web3;
let accounts;
let storageSharing;

window.addEventListener('load', async () => {
	if (window.ethereum) {
		web3 = new Web3(window.ethereum);
		await window.ethereum.enable();
		accounts = await web3.eth.getAccounts();

		storageSharing = new web3.eth.Contract(contractABI, contractAddress);

		await listAllStorages();
	} else {
		alert('Please install MetaMask to use this app');
	}
});

// Register a provider
document.getElementById("providerForm").addEventListener("submit", async (event) => {
	event.preventDefault();

	const availableSpace = document.getElementById("availableSpace").value;
	const pricePerMB = document.getElementById("pricePerMB").value;
	const socket = document.getElementById("socket").value;

	try {
		await storageSharing.methods.registerStorage(
			availableSpace,
			pricePerMB,
			socket
		).send({ from: accounts[0] });

		document.getElementById("providerMessage").textContent = "Storage successfully registered!";

		const downloadLink = document.createElement('a');
		downloadLink.href = '/files/test.txt';
		downloadLink.download = 'test.txt';    // Ensure the filename is correct
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	} catch (error) {
		console.error("Error registering storage:", error);
		document.getElementById("providerMessage").textContent = "Failed to register storage. Please try again.";
	}
});

async function listAllStorages() {
	try {
		const storageCount = await storageSharing.methods.storageCount().call();
		const storageListing = document.getElementById('storageListing');
		storageListing.innerHTML = '';

		for (let i = 1; i <= storageCount; i++) {
			const storageInfo = await storageSharing.methods.storages(i).call();
			const { owner, consumer, gb, rate, isAvailable, } = storageInfo;
			const paymentAmount = gb * rate;

			const row = document.createElement('tr');
			row.innerHTML = `
                <td>${i}</td>
                <td>${owner}</td>
				<td>${consumer}</td>
                <td>${gb} MB</td>
                <td>${rate} wei</td>
                <td>${isAvailable ? 'Available' : 'Rented'}</td>
				<td>
					<button class="rent-button" ${isAvailable ? '' : 'disabled'} onclick="rentStorage(${i}, ${paymentAmount})">
						Rent
					</button>
				</td>
            `;
			storageListing.appendChild(row);
		}
	} catch (error) {
		console.error('Error fetching storages:', error);
	}
}

async function rentStorage(storageId, paymentAmount) {
	try {
		await storageSharing.methods.rentStorage(storageId).send({
			from: ethereum.selectedAddress,
			value: paymentAmount // Ensure this passes the correct ether amount
		});
		alert('Storage rented successfully!');
		listAllStorages(); // Refresh the listing after renting
	} catch (error) {
		console.error('Error renting storage:', error);
	}
}
