// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {
    mapping(address => bool) public hasVoted;
    mapping(uint256 => uint256) public votes;
    uint256 public totalVotes;

    event VoteCast(address indexed voter, uint256 option);

    function castVote(uint256 _option, uint256[2] memory a, uint256[2][2] memory b, uint256[2] memory c, uint256[1] memory input) public {
        require(!hasVoted[msg.sender], "Already voted");
        // Call the zk-SNARK verifier
        require(verifyProof(a, b, c, input), "Invalid proof");

        hasVoted[msg.sender] = true;
        votes[_option]++;
        totalVotes++;

        emit VoteCast(msg.sender, _option);
    }

    function verifyProof(
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        uint256[1] memory input
    ) public view returns (bool) {
        // Implement the verifier logic or call the zk-SNARK verifier contract
        // This is a placeholder for the actual zk-SNARK verification
        return true;
    }
}
