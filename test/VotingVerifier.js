const { expect } = require("chai");
const { ethers } = require("hardhat");
const snarkjs = require("snarkjs");
const path = require("path");

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

  it("Should fail to vote if input is invalid", async function () {
    await votingVerifier.registerVoter(addr1.address);

    // Mock invalid zk-SNARK proof and public signals
    const a = [0, 0];
    const b = [[0, 0], [0, 0]];
    const c = [0, 0];
    const input = [2]; // Invalid candidate

    await expect(
      votingVerifier.connect(addr1).verifyVote(a, b, c, input)
    ).to.be.revertedWith("Invalid candidate");
  });

  it("Should fail to vote if proof is invalid", async function () {
    await votingVerifier.registerVoter(addr1.address);

    // Mock invalid zk-SNARK proof and public signals
    const a = [0, 0];
    const b = [[0, 0], [0, 0]];
    const c = [0, 0];
    const input = [1];

    await expect(
      votingVerifier.connect(addr1).verifyVote(a, b, c, input)
    ).to.be.revertedWith("Invalid proof");
  });

  it("Should allow a registered voter to vote", async function () {
    await votingVerifier.registerVoter(addr1.address);

    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
      { vote: 1, voterId: addr1.address },
      path.resolve('./build/vote_js/vote.wasm'),
      path.resolve('./build/vote_0000.zkey')
    );

    console.log(JSON.stringify(proof, null, 1))
    console.log(JSON.stringify(publicSignals, null, 1))

    const a = [proof.pi_a[0], proof.pi_a[1]];
    const b = [
      [proof.pi_b[0][0], proof.pi_b[0][1]],
      [proof.pi_b[1][0], proof.pi_b[1][1]]
    ];
    const c = [proof.pi_c[0], proof.pi_c[1]];
    const inputs = publicSignals.map(x => x.toString());

    const tx = await votingVerifier.connect(addr1).verifyVote(a, b, c, inputs);
    await tx.wait();

    const voter = await votingVerifier.voters(addr1.address);
    expect(voter.voted).to.be.true;
    expect(voter.vote).to.equal(1);

    const votes = await votingVerifier.getVotes();
    expect(votes[1]).to.equal(1);
  });
});
