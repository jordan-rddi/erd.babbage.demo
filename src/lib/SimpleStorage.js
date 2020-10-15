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
}

const SimpleStorage = new simpleStorage();
module.exports = SimpleStorage;