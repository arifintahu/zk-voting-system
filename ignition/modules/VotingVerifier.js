const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VotingVerifierModule", (m) => {
  const votingVerifier = m.contract("VotingVerifier", []);

  m.call(votingVerifier, "registerVoter", [
    "0x28ea15261a7e81645f43de81ecadee00be84fbac",
  ]);

  return { votingVerifier };
});
