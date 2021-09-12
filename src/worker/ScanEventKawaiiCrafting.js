require("dotenv").config();
const { ethers } = require("ethers");
const Crafting = require("../models/crafting");

const config = require("../config");

const ABIKawaiiCrafting = require("../abi/KawaiiCrafting.json");
const provider = new ethers.providers.JsonRpcProvider(
  config.BSCNetwork1.RPC_PROVIDER
);
const ContractCrafting = new ethers.Contract(
  config.KawaiiCrafting,
  ABIKawaiiCrafting,
  provider
);

module.exports.runEventCrafting = async () => {
  ContractCrafting.on("Crafting", async (sender, nftId, event) => {
    await Crafting.safeCreate({
      values: {
        address: sender,
        nftId,
      },
    });
  });
};
