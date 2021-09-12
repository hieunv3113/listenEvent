require("dotenv").config();
const { ethers } = require("ethers");
const Convert = require("../models/convert");

const config = require("../config");

const ABIKawaiiMining = require("../abi/KawaiiMining.json");
const provider = new ethers.providers.JsonRpcProvider(
  config.BSCNetwork1.RPC_PROVIDER
);
const ContractMining = new ethers.Contract(
  config.KawaiiMinting,
  ABIKawaiiMining,
  provider
);

module.exports.runEventConvert = async () => {
  ContractMining.on("Convert", async (sender, nftId, amount, event) => {
    console.log(`${sender} convert ${amount} with Id ${nftId}`);
    await Convert.safeCreate({
      values: {
        address: sender,
        nftId,
        amount,
      },
    });
  });
};
