'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _contractVariable = require('../configs/contractVariable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getWeb3 = new Promise(resolve => {
  window.addEventListener('load', () => {
    let results;
    let {
      web3
    } = window;
    // check if web3 or metamask is activated
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new _web2.default(web3.currentProvider);

      results = {
        web3Instance: web3
      };

      console.log('Connect Web3 --');

      resolve(results);
    } else {
      // will connect is to ropsten network in infura
      const provider = new _web2.default.providers.HttpProvider(_contractVariable.ropstenProvider);

      web3 = new _web2.default(provider);

      results = {
        web3Instance: web3
      };
      console.log('new Connect Web3');
      resolve(results);
    }
  });
});

exports.default = getWeb3;