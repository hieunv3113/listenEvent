require("dotenv").config();
const { ethers } = require("ethers");
const Delivery = require("../models/delivery");

const config = require("../config");

const ABIKawaiiDelivery = require("../abi/KawaiiDelivery.json");
const provider = new ethers.providers.JsonRpcProvider(
  config.BSCNetwork1.RPC_PROVIDER
);
const ContractDelivery = new ethers.Contract(
  config.KawaiiDelivery,
  ABIKawaiiDelivery,
  provider
);

module.exports.runEventDelivery = async () => {
  ContractDelivery.on("Delivery", async (sender, reward, event) => {
    console.log(`${sender} convert ${amount} with Id ${nftId}`);
    await Delivery.safeCreate({
      values: {
        address: sender,
        reward,
      },
    });
  });
};
