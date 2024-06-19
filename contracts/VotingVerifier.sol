// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./verifier.sol";

contract VotingVerifier is Groth16Verifier {
    struct Voter {
        bool registered;
        bool voted;
        uint256 vote; // Candidate ID
    }

    address public admin;
    mapping(address => Voter) public voters;
    uint8[2] public votes; // Vote count for each candidate

    event VoteVerified(address indexed voter, uint256 vote);
    event Debug(string message, bool value);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function registerVoter(address _voter) public onlyAdmin {
        require(!voters[_voter].registered, "Voter is already registered");
        voters[_voter] = Voter({registered: true, voted: false, vote: 0});
    }

    function verifyVote(
        uint[2] calldata a,
        uint[2][2] calldata b,
        uint[2] calldata c,
        uint[1] calldata _input
    ) public returns (bool) {
        require(voters[msg.sender].registered, "Voter is not registered");
        require(!voters[msg.sender].voted, "Voter has already voted");
        require(_input[0] < 2, "Invalid candidate");

        // Verify zk-SNARK proof (simplified, replace with actual verification logic)
        bool verified = verifyProof(a, b, c, _input);
        emit Debug("Verification result", verified);
        require(verified, "Invalid proof");

        // Extract the vote value from the public signals
        uint256 vote = _input[0];
        
        // Ensure the vote is either 0 or 1
        require(vote == 0 || vote == 1, "Invalid vote value");

        voters[msg.sender].voted = true;
        voters[msg.sender].vote = vote;
        votes[vote]++;

        emit VoteVerified(msg.sender, vote);

        return true;
    }

    function getVotes() public view returns (uint8[2] memory) {
        return votes;
    }
}
