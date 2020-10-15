const Web3 = require('web3');
let web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

web3.eth.accounts.wallet.add('0x493e11e7f0b052ae8fb0e1834569fd6e822e1ff98b9e672a36529eaad249b09d');

class simpleStorage {
  constructor() {
    const simpleStorageData = require('@/fudge/build/contracts/SimpleStorage.json');

    this.abi = simpleStorageData.abi;
    this.address = simpleStorageData.deployment.address;

    this.contract = new web3.eth.Contract(this.abi, this.address);
  }

  getStoredData() {
    return this.contract.methods.storedData().call({from: '0x1581eb58c7bc7d6c8aa6d05575bee76eae623e40'});
  }

  setStoredData(data) {
    return new Promise((resolve, reject) => {
      // Estimate the gas for the function `set` with the parameter `123`
      this.contract.methods.set(data).estimateGas({ from: '0x1581eb58c7bc7d6c8aa6d05575bee76eae623e40' })
        .then(gasEstimate => {
          return this.contract.methods.set(data).send({from: '0x1581eb58c7bc7d6c8aa6d05575bee76eae623e40', gas: gasEstimate})
            .on('transactionHash', function(hash) { // transaction hash
              console.log(`Transaction hash: ${hash}`);
            })
            .on('confirmation', function(confirmationNumber, receipt) { // number of blocks in front of the transaction block
              console.log(`Confirmation: ${confirmationNumber}`);
            })
            .on('receipt', function(receipt) { // transaction receipt
              console.log(`Receipt: ${JSON.stringify(receipt)}`);
            })
            .on('error', function(error, receipt) { // transaction error
              console.log(`Error: ${error}`);
            });
        })
        .then(transactionReceipt => {
          resolve(transactionReceipt);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

const SimpleStorage = new simpleStorage();
module.exports = SimpleStorage;