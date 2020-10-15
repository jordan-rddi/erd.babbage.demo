
const SimpleStorage = require('../build/contracts/SimpleStorage.json');

module.exports = deployer => {
  return deployer.deploy(SimpleStorage, [0]);
}
