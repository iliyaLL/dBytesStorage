# dBytesStorage

Decentralized Bytes Storage

## Objective:

To create a decentralized platform where users can rent out unused storage space on their
devices and others can use it to store their files securely and affordably.

Motivation:

- Reduce costs associated with centralized cloud storage services.
- Promote resource sharing by utilizing underutilized storage space.
- Provide a decentralized, secure, and censorship-resistant storage option.

## Features

**Core:**

1. Peer-to-Peer Storage Marketplace: Users can rent out their unused storage space
   or purchase storage from others on a decentralized network.
2. Smart Contracts for Data Storage and Payments: Manages agreements between
   storage providers and consumers, ensuring transparent and fair payments based on
   storage used.
3. File Encryption and Fragmentation: Files are encrypted, fragmented, and stored
   across multiple nodes for security and redundancy.

**Additional:**

1. Automated Backup & Redundancy: Ensures that files are replicated across
   multiple locations, providing fault tolerance and data recovery.
2. Version Control: Tracks and manages different versions of files for easy access and
   recovery.

## Detailed Architecture:

1. User Application:
   - Storage Providers: Register available space for rent.
   - Storage Consumers: Upload and manage files.
   - Dashboard: For tracking usage, payments, and performance.
2. Blockchain Layer: - Smart Contracts: Automate storage rental agreements, payment, and data
   retrieval. - File Distribution Contracts: Manage the splitting and distribution of file
   fragments across multiple providers.
3. Storage Network(optional):
   - Distributed Nodes: Store encrypted file fragments across different nodes.
   - File Recovery Mechanism: Ensures users can retrieve data even if some
     nodes fail.
4. Token System:
   - Storage Tokens: Used for payments between storage providers and
     consumers.
   - Incentives(optional): Reward providers for maintaining uptime and
     performance.

## Examples of Centralized Products:

1. Google Drive: A centralized cloud storage service where Google manages all user
   data storage and access.
2. Dropbox: Offers centralized cloud storage where files are stored and managed on
   Dropbox servers.
3. Amazon S3: Amazon’s Simple Storage Service (S3) allows users to store and
   retrieve data, but all operations and data handling are controlled by Amazon.

## Work Flow

**Storage Provider User Flow (Steps)**

1. Sign-Up/Sign-In: Provider registers or logs in with email or wallet.
2. Profile Setup: Provider sets up profile details like available storage and pricing.
3. Storage Listing Creation: Provider creates and publishes storage listings.
4. Waiting for Requests: Provider waits for consumer requests to rent storage.
5. Accepting a Request: Provider reviews and accepts storage contract requests.
6. Storage Monitoring: Provider tracks storage usage, uptime, and payments.
7. Payment and Contract Conclusion: Provider receives payment at contract end or
   renewal.

**Storage Consumer User Flow (Steps)**

1. Sign-Up/Sign-In: Consumer registers or logs in with email or wallet.
2. Storage Search: Consumer searches for storage based on size, price, and security.
3. Viewing Provider Profile: Consumer views provider’s profile and storage details.
4. Contract Agreement: Consumer initiates a smart contract for the selected storage.
5. File Upload and Encryption: Consumer uploads files, which are encrypted and
   distributed.
6. Monitoring Storage Usage: Consumer tracks storage usage, encryption, and
   contract status.
7. Payment and Contract Renewal: Consumer makes payment or renews/terminates
   the contract

## Usage

```
Connet all devices to one LAN (Personal Hotspot)
npx hardhat node --hostname {ip}
Add new Network Metamask
configure hardhat.config.js
module.exports = {
  solidity: "0.8.27",
  networks: {
    localhost: {
      url: "http://{ipv4}:{PORT}",
    },
  },
};
npx hardhat run scripts/deploy.js --network localhost
```
