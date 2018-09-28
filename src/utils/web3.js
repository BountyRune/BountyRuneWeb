import Web3 from 'web3';
import {
  ropstenProvider
} from '../configs/contractVariable';

const getWeb3 = new Promise(((resolve) => {
  window.addEventListener('load', () => {
    let results;
    let {
      web3
    } = window;
    // check if web3 or metamask is activated
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider);

      results = {
        web3Instance: web3,
      };

      console.log('Connect Web3 --');

      resolve(results);
    } else {
      // will connect is to ropsten network in infura
      const provider = new Web3.providers.HttpProvider(ropstenProvider);

      web3 = new Web3(provider);

      results = {
        web3Instance: web3,
      };
      console.log('new Connect Web3');
      resolve(results);
    }
  });
}));

export default getWeb3;