pragma circom 2.0.0;

template IsEqual() {
    signal input in[2];
    signal output out;

    // The output is 1 if the inputs are equal, 0 otherwise
    signal intermediate;
    intermediate <== in[0] - in[1];
    out <== 1 - intermediate * intermediate; // out will be 1 if in[0] == in[1], otherwise 0
}

template VoteCircuit() {
    signal input vote;
    signal input voterId;

    signal output isValid;

    // Check if vote is either 0 or 1
    component checkZero = IsEqual();
    component checkOne = IsEqual();

    checkZero.in[0] <== vote;
    checkZero.in[1] <== 0;

    checkOne.in[0] <== vote;
    checkOne.in[1] <== 1;

    isValid <== checkZero.out + checkOne.out;
}

component main = VoteCircuit();