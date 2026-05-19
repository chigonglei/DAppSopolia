````markdown
# Blockchain-Based E-Voting System

A decentralized and secure electronic voting system built using Ethereum blockchain, Solidity smart contracts, React.js frontend, and MetaMask wallet integration.

This project demonstrates how blockchain technology can improve transparency, security, immutability, and trust in the electoral process.

---

# Features

## Blockchain Features
- Ethereum Smart Contract Integration
- Immutable Vote Storage
- Decentralized Voting System
- Transparent Election Process
- Smart Contract Automation
- Secure Blockchain Transactions

## Voting Features
- One Person One Vote
- Duplicate Vote Prevention
- Candidate Registration
- Automatic Vote Counting
- Real-Time Election Results
- Vote Integrity Verification

## Frontend Features
- Modern React.js UI
- MetaMask Wallet Connection
- Candidate Cards
- Vote Confirmation Modal
- Error Handling Modal
- Responsive Design

## Security Features
- Wallet Authentication
- Smart Contract Validation
- Immutable Records
- Blockchain Transparency
- Unauthorized Access Prevention

---

# Tech Stack

## Blockchain
- Ethereum
- Solidity
- Sepolia Testnet
- Hardhat

## Frontend
- React.js
- JavaScript
- CSS3
- Ethers.js

## Backend
- Node.js
- Express.js

## Wallet
- MetaMask

## Development Tools
- VS Code
- Hardhat
- npm
- Git

---

# Project Structure

```text
DApp Sepolia/
│
├── artifacts/
│   ├── build-info/
│   └── contracts/
│       └── Voting.sol/
│           ├── Voting.json
│           ├── Voting.dbg.json
│           └── artifacts.d.ts
│
├── cache/
│   ├── build-info/
│   ├── compile-cache.json
│   └── solidity-files-cache.json
│
├── client/
│   │
│   ├── build/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │   └── background.png
│   │   │
│   │   ├── components/
│   │   │   ├── CandidateCard.js
│   │   │   ├── ConnectWalletButton.js
│   │   │   ├── ErrorModal.js
│   │   │   ├── Navbar.js
│   │   │   ├── VoteConfirmModal.js
│   │   │   └── WalletModal.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   └── Voting.js
│   │   │
│   │   ├── services/
│   │   │   └── contract.js
│   │   │
│   │   ├── styles/
│   │   │
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
├── contracts/
│   └── Voting.sol
│
├── scripts/
│   ├── deploy.js
│   └── voters.json
│
├── .env
├── .gitignore
├── hardhat.config.js
├── package.json
├── package-lock.json
├── server.js
├── Presentation.pptx
└── README.md
````

---

# Smart Contract Overview

The smart contract handles the complete election logic.

## Main Functions

### Add Candidate

Registers candidates before election starts.

### Start Election

Enables voting process.

### End Election

Stops voting process.

### Vote Casting

Allows eligible voters to vote securely.

### Result Generation

Automatically counts votes.

### Duplicate Vote Prevention

Blocks multiple voting attempts from same wallet.

---

# Installation Guide

# Prerequisites

Install the following:

* Node.js
* npm
* MetaMask Extension
* Git
* VS Code

---

# Clone Repository

```bash
git clone https://github.com/your-username/blockchain-e-voting.git
```

```bash
cd blockchain-e-voting
```

---

# Install Root Dependencies

```bash
npm install
```

---

# Install Frontend Dependencies

```bash
cd client
npm install
```

---

# Install Hardhat

```bash
npm install --save-dev hardhat
```

---

# Environment Variables

Create `.env` file in root folder:

```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY

PRIVATE_KEY=YOUR_PRIVATE_KEY
```

---

# Compile Smart Contract

```bash
npx hardhat compile
```

---

# Deploy Smart Contract

## Local Network

Start local blockchain:

```bash
npx hardhat node
```

Deploy contract:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

---

## Sepolia Deployment

Deploy to Sepolia testnet:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

---

# Configure Frontend

Open:

```text
client/src/services/contract.js
```

Add:

```javascript
const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
```

---

# Start Frontend

```bash
cd client
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

# Running Complete Project

## Step 1

Start blockchain node:

```bash
npx hardhat node
```

## Step 2

Deploy smart contract:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

## Step 3

Start React frontend:

```bash
cd client
npm start
```

## Step 4

Connect MetaMask wallet.

## Step 5

Vote securely.

---

# MetaMask Setup

## Install MetaMask

Download browser extension.

## Add Sepolia Network

Network Name:

```text
Sepolia
```

RPC URL:

```text
https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
```

Chain ID:

```text
11155111
```

Currency Symbol:

```text
ETH
```

---

# Voting Workflow

## Election Setup

* Deploy smart contract
* Add candidates
* Start election

## Voting Process

* Connect wallet
* Select candidate
* Confirm transaction
* Vote stored on blockchain

## Result Generation

* Smart contract counts votes automatically
* Results displayed transparently

---

# Security Implementation

## Blockchain Immutability

Votes cannot be modified after recording.

## Smart Contract Validation

Invalid transactions are rejected.

## Duplicate Vote Protection

Wallet address can vote only once.

## Transparent Audit Trail

All votes stored publicly on blockchain.

---

# Components Description

## CandidateCard.js

Displays candidate details.

## ConnectWalletButton.js

Handles MetaMask connection.

## WalletModal.js

Wallet interaction modal.

## VoteConfirmModal.js

Vote confirmation popup.

## ErrorModal.js

Displays transaction errors.

## Navbar.js

Navigation component.

---

# Smart Contract File

## Voting.sol

Main Solidity smart contract containing:

* Candidate management
* Voting logic
* Election state
* Vote counting
* Access control

---

# Scripts

## deploy.js

Deploys smart contract to blockchain network.

## voters.json

Stores voter-related information.

---

# Build Production Version

```bash
cd client
npm run build
```

Production files generated inside:

```text
client/build/
```

---

# Deployment

## Frontend Deployment

Recommended:

* Vercel
* Netlify

## Blockchain Deployment

Recommended:

* Sepolia Testnet
* Ethereum Mainnet

---

# Future Improvements

* Biometric Authentication
* Mobile Voting
* QR Code Verification
* Face Recognition
* Zero-Knowledge Proofs
* AI Fraud Detection
* Multi Election Support
* Real-Time Analytics
* Advanced Privacy Mechanisms

---

# Challenges Faced

* Smart Contract Debugging
* MetaMask Integration
* Blockchain Transaction Delays
* Frontend Wallet Synchronization
* Gas Fee Management
* Vote Validation Logic

---

# Testing

## Functional Testing

Tested:

* Candidate Registration
* Vote Casting
* Wallet Connection
* Result Generation

## Security Testing

Tested:

* Duplicate Vote Prevention
* Unauthorized Access
* Invalid Transactions

---

# Advantages of Blockchain Voting

* High Security
* Transparency
* Decentralization
* Tamper Resistance
* Fast Vote Counting
* Trustless Verification

---

# Limitations

* Blockchain Scalability
* Transaction Latency
* Internet Dependency
* Gas Fees
* Requires Technical Knowledge

---

# Conclusion

This Blockchain-Based E-Voting System demonstrates how decentralized blockchain technology can improve modern electoral systems by providing transparency, security, trust, and automation.

Using Ethereum smart contracts and MetaMask integration, the system successfully implements secure electronic voting with immutable records and automatic vote verification.

The project serves as a strong foundation for future blockchain-based governance and digital election systems.

---

# License

MIT License

---

# Author

Blockchain-Based E-Voting System Project

Developed using:

* Solidity
* Ethereum
* React.js
* Hardhat
* MetaMask

```
```
