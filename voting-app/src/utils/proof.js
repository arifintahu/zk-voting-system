import { groth16 } from "snarkjs";

export async function generateProof(voterId, vote) {
  const { proof, publicSignals } = await groth16.fullProve(
    { vote: vote, voterId: voterId },
    "vote.wasm",
    "vote_0000.zkey"
  );

  return { proof, publicSignals }
}