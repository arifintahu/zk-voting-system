const snarkjs = require("snarkjs");
const fs = require("fs");

async function generateProof() {
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    { vote: 1, voterId: "0x390dc2368bfde7e7a370af46c0b834b718d570c1" }, // Example input
    "./build/vote_js/vote.wasm",
    "./build/vote_0000.zkey"
  );

  console.log("Proof: ", proof);
  console.log("Public Signals: ", publicSignals);

  fs.writeFileSync("./build/proof.json", JSON.stringify(proof, null, 1));
  fs.writeFileSync("./build/public.json", JSON.stringify(publicSignals, null, 1));
}

generateProof().then(() => {
  console.log("Proof generation complete");
});
