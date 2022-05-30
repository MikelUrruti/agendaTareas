require('dotenv').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");

//Account credentials from which our contract will be deployed
const mnemonic = process.env.MNEMONIC;

//Direccion de la cartera: 0xCFA23C321fa59Fb310087d90d54bd6F4EBC6B7Af


//API key of your Datahub account for Avalanche Fuji test network
const APIKEY = process.env.APIKEY;
// const APIKEY = "";


module.exports = {
  networks: {
    fuji: {
      provider: function() {
            return new HDWalletProvider({mnemonic, providerOrUrl: APIKEY, chainId: "43113"})
      },
      network_id: "*",
      gas: 3000000,
      gasPrice: 225000000000,
      // skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.8.11",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }

  }

}
