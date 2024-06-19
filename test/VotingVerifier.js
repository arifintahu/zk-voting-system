const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VotingVerifier", function () {
  let VotingVerifier, votingVerifier, owner, addr1, addr2;

  beforeEach(async function () {
    VotingVerifier = await ethers.getContractFactory("VotingVerifier");
    [owner, addr1, addr2, _] = await ethers.getSigners();
    votingVerifier = await VotingVerifier.deploy();
    await votingVerifier.deployed();
  });

  it("Should set the right admin", async function () {
    expect(await votingVerifier.admin()).to.equal(owner.address);
  });

  it("Should register a voter", async function () {
    await votingVerifier.registerVoter(addr1.address);
    const voter = await votingVerifier.voters(addr1.address);
    expect(voter.registered).to.be.true;
    expect(voter.voted).to.be.false;
    expect(voter.vote).to.equal(0);
  });

  // it("Should allow a registered voter to vote", async function () {
  //   await votingVerifier.registerVoter(addr1.address);

  //   // Mock zk-SNARK proof and public signals (replace with real values)
  //   const a = [0, 0];
  //   const b = [[0, 0], [0, 0]];
  //   const c = [0, 0];
  //   const input = [1];

  //   await votingVerifier.connect(addr1).verifyVote(a, b, c, input);

  //   const voter = await votingVerifier.voters(addr1.address);
  //   expect(voter.voted).to.be.true;
  //   expect(voter.vote).to.equal(1);

  //   const votes = await votingVerifier.getVotes();
  //   expect(votes[1]).to.equal(1);
  // });

  // it("Should fail to vote if proof is invalid", async function () {
  //   await votingVerifier.registerVoter(addr1.address);

  //   // Mock invalid zk-SNARK proof and public signals
  //   const a = [0, 0];
  //   const b = [[0, 0], [0, 0]];
  //   const c = [0, 0];
  //   const input = [2]; // Invalid candidate

  //   await expect(
  //     votingVerifier.connect(addr1).verifyVote(a, b, c, input)
  //   ).to.be.revertedWith("Invalid candidate");
  // });
});
