#!/bin/bash

mkdir -p build

# Compile the circuit
circom ./circom/vote.circom --r1cs --wasm --sym -o ./build

# Generate the witness
snarkjs wtns calculate ./build/vote_js/vote.wasm ./input.json ./build/witness.wtns

# Setup
snarkjs groth16 setup ./build/vote.r1cs ./ptau/pot12_final.ptau ./build/vote_0000.zkey

# Generate a proof
snarkjs groth16 prove ./build/vote_0000.zkey ./build/witness.wtns ./build/proof.json ./build/public.json

# Verify the proof
snarkjs groth16 verify ./build/vote_verification_key.json ./build/public.json ./build/proof.json
