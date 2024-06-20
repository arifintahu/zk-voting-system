const {  utils } = require("ffjavascript");
const { unstringifyBigInts } = utils;

function p256(n) {
    let nstr = n.toString(16);
    while (nstr.length < 64) nstr = "0"+nstr;
    nstr = `0x${nstr}`;
    return nstr;
}

function groth16ExportSolidityCallData(_proof, _pub) {
    const proof = unstringifyBigInts(_proof);
    const pub = unstringifyBigInts(_pub);

    let inputs = "";
    for (let i=0; i<pub.length; i++) {
        if (inputs != "") inputs = inputs + ",";
        inputs = inputs + p256(pub[i]);
    }

    const a = [p256(proof.pi_a[0]), p256(proof.pi_a[1])];
    const b = [
      [p256(proof.pi_b[0][1]), p256(proof.pi_b[0][0])],
      [p256(proof.pi_b[1][1]), p256(proof.pi_b[1][0])]
    ];
    const c = [p256(proof.pi_c[0]), p256(proof.pi_c[1])];
    const i = [inputs];

    return [a, b, c, i];
}

module.exports = {
    groth16ExportSolidityCallData,
}