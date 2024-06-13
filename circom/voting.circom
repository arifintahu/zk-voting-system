pragma circom 2.0.0;

template VoteOption(n) {
    signal input vote;
    signal input nullifier;

    signal output validVote;

    component isValid = IsEqual();
    isValid.in[0] <== vote;
    isValid.in[1] <== 1; // Assuming valid vote options are 1 (Yes) and 0 (No)

    component isNotDuplicated = IsNotEqual();
    isNotDuplicated.in[0] <== nullifier;
    isNotDuplicated.in[1] <== 0; // Assuming nullifier is unique and non-zero

    validVote <== isValid.out * isNotDuplicated.out;
}

component main = VoteOption(2);
