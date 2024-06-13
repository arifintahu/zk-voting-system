// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Voting {
    struct Voter {
        bool registered;
        bool voted;
        uint8 vote; // Candidate ID
    }

    address public admin;
    mapping(address => Voter) public voters;
    uint8[2] public votes; // Vote count for each candidate

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

    function vote(uint8 _vote, bytes memory _proof) public {
        require(voters[msg.sender].registered, "Voter is not registered");
        require(!voters[msg.sender].voted, "Voter has already voted");
        require(_vote < 2, "Invalid candidate");

        // Verify zk-SNARK proof (simplified, replace with actual verification logic)
        require(verifyProof(_proof, _vote), "Invalid zk-SNARK proof");

        voters[msg.sender].voted = true;
        voters[msg.sender].vote = _vote;
        votes[_vote]++;
    }

    function verifyProof(bytes memory _proof, uint8 _vote) internal pure returns (bool) {
        // Dummy zk-SNARK proof verification
        return true;
    }

    function getVotes() public view returns (uint8[2] memory) {
        return votes;
    }
}
