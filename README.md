# ZK Voting System

The ZK Voting System is developed as the final project for Encode Club's ZK Bootcamp Q2 2024. It is a secure and private voting application utilizing Zero-Knowledge Proofs (ZKPs) with Circom and snarkjs. ZKPs enable one party to prove knowledge of a value without revealing the value itself, making it an ideal solution for ensuring vote privacy and integrity.

## Instructions

Follow these steps to set up the project locally:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/arifintahu/zk-voting-system.git
   cd zk-voting-system
   ```

2. **Install Dependencies:**

   ```bash
   yarn install
   ```

3. **Compile Smart Contracts:**

   ```bash
   npm run contract:compile
   ```

4. **Run Smart Contract Tests:**

   ```bash
   npm run contract:test
   ```

5. **Deploy Contracts to Sepolia:**

   Before deploying, ensure you configure your variables based on `hardhat.config.js`.

   ```bash
   npx hardhat vars set ALCHEMY_API_KEY
   npx hardhat vars set SEPOLIA_PRIVATE_KEY
   npx hardhat vars set ETHERSCAN_API_KEY

   npm run contract:deploy-sepolia
   ```

6. **Install Voting App Dependencies:**

   ```bash
   cd voting-app
   npm install
   ```

7. **Run Voting App:**

   Ensure you update the network settings and contract address as per the deployed contract.

   ```bash
   npm start
   ```

8. **Cast a Vote:**

   - Choose the candidate or option you wish to vote for.
   - Confirm the transaction in MetaMask.
   - Your vote will be securely recorded on the blockchain using Zero-Knowledge Proofs.

## Result

The ZK Voting Verifier contract has been deployed to the Sepolia Network at this contract address: [0x979B55616d77a4a7604882Fff49157b2CBe96148](https://sepolia.etherscan.io/address/0x979b55616d77a4a7604882fff49157b2cbe96148). The first verified vote transaction can be viewed here: [0x2138bc37148018bf8869559ca7ef1228fd46953ab7c9be8ec7e5a8ce996d7755](https://sepolia.etherscan.io/tx/0x2138bc37148018bf8869559ca7ef1228fd46953ab7c9be8ec7e5a8ce996d7755).

## Contact

If you have any questions or need further assistance, please contact via [email](mailto:miftahul97@gmail.com).
