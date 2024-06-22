const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VotingVerifierModule", (m) => {
  const votingVerifier = m.contract("VotingVerifier", []);

  return { votingVerifier };
});