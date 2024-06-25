async function main() {
  const Verifier = await ethers.getContractFactory("Verifier");
  const verifier = await Verifier.deploy();
  await verifier.deployed();
  console.log("Verifier deployed to:", verifier.address);

  const VoteVerifier = await ethers.getContractFactory("VoteVerifier");
  const voteVerifier = await VoteVerifier.deploy();
  await voteVerifier.deployed();
  console.log("VoteVerifier deployed to:", voteVerifier.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
