const { ethers } = require("ethers");

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("YOUR_RPC_PROVIDER_URL");
    const signer = provider.getSigner();

    const voteVerifierAddress = "YOUR_DEPLOYED_VOTE_VERIFIER_ADDRESS";
    const VoteVerifier = await ethers.getContractFactory("VoteVerifier");
    const voteVerifier = VoteVerifier.attach(voteVerifierAddress);

    const proof = {
        a: ["PROOF_A0", "PROOF_A1"],
        b: [["PROOF_B00", "PROOF_B01"], ["PROOF_B10", "PROOF_B11"]],
        c: ["PROOF_C0", "PROOF_C1"]
    };

    const pubSignals = ["INPUT_0"];  // Replace with actual public signal

    const tx = await voteVerifier.verifyVote(proof.a, proof.b, proof.c, pubSignals);
    await tx.wait();

    console.log("Vote verified and recorded.");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
