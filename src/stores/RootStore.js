import DAppStore from './DAppStore';
import MatchStore from './MatchStore';
// import getWeb3 from '../utils/web3';

class RootStore {
  constructor() {
    this.dAppStore = new DAppStore(this);
    this.matchStore = new MatchStore(this);
  }  
}

export default RootStore;