import axios from 'axios';
import {
  observable,
  action,
} from 'mobx';
import {
  contractABI,
  contractAddress,
  contractBytecode
} from '../configs/contractVariable';
import web3 from 'web3';
import swal from 'sweetalert2'


class MatchStore {
  @observable contract;
  @observable matches = [];
  @observable selectedMatch = {
    direTeam: {
      name: '',
      logo_url: '',
      tag: ''
    },
    radiantTeam: {
      name: '',
      logo_url: '',
      tag: ''
    },
    bettable: false,
    direBets: "0",
    direPlayers: [],
    direWin: false,
    finished: false,
    id: 0,
    matchId: "0",
    msg: "",
    poolPrice: "0",
    radiantBets: "0",
    radiantPlayers: [],
    radiantWin: false,
    refundable: false,
    startTime: 0,
    winner: '',
    withdrawable: false,
  };
  @observable initialize = false;
  @observable currentBetting = 0;
  @observable newMatchId = 0;
  @observable addMatchMsg

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action.bound
  async init() {
    let newContract = new this.rootStore.dAppStore.web3.eth.Contract(
      contractABI,
      contractAddress, {
        data: contractBytecode,
        from: this.rootStore.dAppStore.web3.eth.getAccounts()[0],
        gas: 300000,
      }
    );
    this.contract = newContract;
    let numberOfMatches = await newContract.methods.matchesNumber().call();
    let matches = [];

    for (let i = 0; i < numberOfMatches; i++) {
      let match = await newContract.methods.matches(i).call();
      const matchInfo = await axios.get(`https://bounty-rune-bridge.herokuapp.com/result/dota/${match.matchId}`);

      matches.push({
        ...await matchInfo.data,
        ...await newContract.methods.matches(i).call()
      })
    }

    this.matches = matches;
    this.initialize = true;
  }

  @action.bound
  async changeRole(address) {

  }

  @action.bound
  setAddress(e) {

  }
  
  @action.bound
  async getMatch(matchId) {
    let newContract = new this.rootStore.dAppStore.web3.eth.Contract(
      contractABI,
      contractAddress, {
        data: contractBytecode,
        from: this.rootStore.dAppStore.web3.eth.getAccounts()[0],
        gas: 300000,
      }
    );
    const matchIndex = await newContract.methods.matchIdToId(matchId).call();
    this.selectedMatch = this.matches[parseInt(matchIndex)]
  }

  @action.bound
  async bet(onRadiant) {
    let newContract = new this.rootStore.dAppStore.web3.eth.Contract(
      contractABI,
      contractAddress, {
        data: contractBytecode,
        from: this.rootStore.dAppStore.web3.eth.getAccounts()[0],
        gas: 300000,
      }
    );
    const bettings = await newContract.methods.bet(this.selectedMatch.matchId, onRadiant)
      .send({
        from: this.rootStore.dAppStore.address,
        value: this.currentBetting,
      })
  }

  @action.bound
  async refund(onRadiant) {
    let newContract = new this.rootStore.dAppStore.web3.eth.Contract(
      contractABI,
      contractAddress, {
        data: contractBytecode,
        from: this.rootStore.dAppStore.web3.eth.getAccounts()[0],
        gas: 300000,
      }
    );
    const refunds = await newContract.methods.refund(this.selectedMatch.matchId, onRadiant, this.rootStore.dAppStore.address)
      .send({
        from: this.rootStore.dAppStore.address
      })
  }

  @action.bound
  setBet(e) {
    const value = e.target.value
    this.currentBetting = web3.utils.toWei(value);
  }

  @action.bound
  setNewMatchId(e) {
    this.newMatchId = e.target.value;
  }

  @action.bound
  async addMatch() {
    let newContract = new this.rootStore.dAppStore.web3.eth.Contract(
      contractABI,
      contractAddress, {
        data: contractBytecode,
        from: this.rootStore.dAppStore.web3.eth.getAccounts()[0],
        gas: 300000,
      }
    );
    try {
      let matchContract = newContract.methods;
      const matchInfo = await axios.get(`https://bounty-rune-bridge.herokuapp.com/result/dota/${this.newMatchId}`);
      const matchData = matchInfo.data
      this.addMatchMsg = "Please Wait"
      matchContract.addMatch(matchData.id)
        .send({
          from: this.rootStore.dAppStore.address,
        })
        .then(() => {
          this.addMatchMsg = ""
          swal(
            'Match Added',
            'Match is existing and now can be betted',
            'success'
          )
        })
        .catch(err => {
          swal({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong! either your addres is not registered as admin or match id is existed',
          })
        })
    } catch (err) {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  }

  @action.bound
  async startMatch() {
    let newContract = new this.rootStore.dAppStore.web3.eth.Contract(
      contractABI,
      contractAddress, {
        data: contractBytecode,
        from: this.rootStore.dAppStore.web3.eth.getAccounts()[0],
        gas: 300000,
      }
    );
    try {
      let matchContract = newContract.methods;
      this.addMatchMsg = "Please Wait"
      matchContract.startMatch(this.selectedMatch.matchId)
        .send({
          from: this.rootStore.dAppStore.address,
        })
        .then(() => {
          this.addMatchMsg = ""
          swal(
            'Match Started',
            'success'
          )
        })
        .catch(err => {
          swal({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        })
    } catch (err) {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  }

  @action.bound
  async endMatch() {
    try {
      axios.post(`http://localhost:4001/setWinner`, {
          matchId: this.selectedMatch.matchId
        }).then(() => {
          this.addMatchMsg = ""
          swal(
            'Match Started',
            'success'
          )
        })
        .catch(err => {
          swal({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        })
    } catch (err) {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  }

  @action.bound
  async withdraw() {
    axios.post(`http://localhost:4001/getWinnings`, {
          matchId: this.selectedMatch.matchId,
          address: this.rootStore.dAppStore.address,
    }).then((res) => {
      swal({
        type: 'success',
        title: 'Winnings Withdrawed',
        text: 'Check you balance in metamask!',
      })
    }).catch((err) => {
      swal({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    })
  }
}

export default MatchStore;