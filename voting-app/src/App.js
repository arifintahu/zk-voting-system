import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import VotingVerifier from './contracts/VotingVerifier.sol/VotingVerifier.json';

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
  const [account, setAccount] = useState(null);
  const [votes, setVotes] = useState([0, 0]);
  const [voterId, setVoterId] = useState('');

  useEffect(() => {
    const init = async () => {
      await switchToSepolia()
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract('0x979B55616d77a4a7604882Fff49157b2CBe96148', VotingVerifier.abi, provider.getSigner());
      setProvider(provider);
      setContract(contract);

      const accounts = await provider.send('eth_requestAccounts', []);
      console.log(accounts)
      setAccount(accounts[0]);
    };
    init();
  }, []);

  const registerVoter = async () => {
    if (contract) {
      await contract.registerVoter(account);
    }
  };

  const castVote = async (vote) => {
    if (contract) {
      // const proof = await generateProof(vote, voterId); // Replace with actual proof generation logic
      // await contract.vote(vote, proof);
    }
  };

  const fetchVotes = async () => {
    if (contract) {
      const votes = await contract.getVotes();
      setVotes(votes);
    }
  };

  return (
    <div>
      <h1>zk-SNARK Voting System</h1>
      <button onClick={registerVoter}>Register Voter</button>
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
