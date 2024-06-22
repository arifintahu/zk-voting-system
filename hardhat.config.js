require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-ignition-ethers");
// require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
},
};
