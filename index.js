require("dotenv").config();
const { JsonRpcProvider, ethers } = require("ethers");
const { Web3 } = require("web3");
const tokenAbi = require("./tokenAbi.json");

// Load environment variables
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const CHAIN_ID = process.env.CHAIN_ID || "8453"; // Default to Base Mainnet

const RPC_URLS = {
  84532: `https://base-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
  8453: `https://base-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
};

const providerUrl = RPC_URLS[CHAIN_ID];

async function writeTrx() {
  try {
    if (!PRIVATE_KEY) {
      throw new Error("PRIVATE_KEY is not set in environment variables");
    }
    const web3 = new Web3(providerUrl);

    const provider = new JsonRpcProvider(providerUrl);

    const privateKey = PRIVATE_KEY;
    const wallet = new ethers.Wallet(privateKey, provider);

    const tokenContract = new ethers.Contract(
      contractAddress,
      tokenAbi,
      wallet
    );

    const tx = await tokenContract.incrementSlot();
    console.log("tx,", tx);
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.error("Error:", error);
  }
}
const oneSecond = 1010;
// mainNet
// const startTime = 1741010400000;
// const letTimeToStart = startTime - Date.now();
// const slot1End = letTimeToStart + 4 * 60 * 60 * 1000 + oneSecond;
// const slot2End = letTimeToStart + 8 * 60 * 60 * 1000 + oneSecond;
// const slot3End = letTimeToStart + 12 * 60 * 60 * 1000 + oneSecond;

// testNet
const startTime = 1741003200000;
const letTimeToStart = startTime - Date.now();
const slot1End = letTimeToStart + 20 * 60 * 1000 + oneSecond;
const slot2End = letTimeToStart + 40 * 60 * 1000 + oneSecond;
const slot3End = letTimeToStart + 60 * 60 * 1000 + oneSecond;

// console.log(slot1End / (60 * 1000));
// console.log(slot2End / (60 * 1000));
// console.log(slot3End / (60 * 1000));

setTimeout(() => {
  writeTrx();
}, slot1End);
setTimeout(() => {
  writeTrx();
}, slot2End);
setTimeout(() => {
  writeTrx();
}, slot3End);
