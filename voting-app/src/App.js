import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import VotingVerifier from './contracts/VotingVerifier.sol/VotingVerifier.json';
import { generateProof } from './utils'

async function switchToSepolia() {
  if (typeof window.ethereum !== 'undefined') {
      try {
          await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                  chainId: '0xaa36a7', // Sepolia chain ID in hex
                  chainName: 'Sepolia Test Network',
                  nativeCurrency: {
                      name: 'SepoliaETH',
                      symbol: 'ETH', // Symbol for SepoliaETH
                      decimals: 18
                  },
                  rpcUrls: ['https://rpc.sepolia.org'], // RPC URL for Sepolia
                  blockExplorerUrls: ['https://sepolia.etherscan.io'] // Block explorer URL for Sepolia
              }]
          });
          console.log('Switched to Sepolia network');
      } catch (error) {
          console.error('Error switching to Sepolia network:', error);
      }
  } else {
      console.error('MetaMask is not installed');
  }
}


function App() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [contractQuery, setContractQuery] = useState(null);
  const [account, setAccount] = useState(null);
  const [votes, setVotes] = useState([0, 0]);
  const [voterId, setVoterId] = useState('');

  const CONTRACT_ADDRESS = '0x979B55616d77a4a7604882Fff49157b2CBe96148'

  useEffect(() => {
    const init = async () => {
      try {
        await switchToSepolia()
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, VotingVerifier.abi, provider.getSigner());
        const contractQuery = new ethers.Contract(CONTRACT_ADDRESS, VotingVerifier.abi, provider);
        setProvider(provider);
        setContract(contract);
        setContractQuery(contractQuery);

        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);
      } catch (error) {
        console.error(error)
      }
    };
    init();
  }, []);

  const castVote = async (vote) => {
    if (contract) {
      try {
        const { proof, publicSignals } = await generateProof(vote, account);
        console.log(proof, publicSignals)
        // await contract.vote(vote, proof);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchVotes = async () => {
    if (contract) {
      const votes = await contractQuery.getVotes();
      setVotes([Number(votes['0']), Number(votes['1'])]);
    }
  };

  return (
    <div>
      <h1>zk-SNARK Voting System</h1>
      <div>
        <div>Wallet connected: {account}</div>
      </div>
      <div>
        <button onClick={() => castVote(0)}>Vote for Candidate 0</button>
        <button onClick={() => castVote(1)}>Vote for Candidate 1</button>
      </div>
      <div>
        <button onClick={fetchVotes}>Fetch Votes</button>
        <div>Candidate 0: {votes[0]}</div>
        <div>Candidate 1: {votes[1]}</div>
      </div>
    </div>
  );
}

export default App;
