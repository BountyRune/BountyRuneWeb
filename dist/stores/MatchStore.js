'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _mobx = require('mobx');

var _contractVariable = require('../configs/contractVariable');

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _sweetalert = require('sweetalert2');

var _sweetalert2 = _interopRequireDefault(_sweetalert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

let MatchStore = (_dec = _mobx.action.bound, _dec2 = _mobx.action.bound, _dec3 = _mobx.action.bound, _dec4 = _mobx.action.bound, _dec5 = _mobx.action.bound, _dec6 = _mobx.action.bound, _dec7 = _mobx.action.bound, _dec8 = _mobx.action.bound, _dec9 = _mobx.action.bound, _dec10 = _mobx.action.bound, _dec11 = _mobx.action.bound, _dec12 = _mobx.action.bound, (_class = class MatchStore {

  constructor(rootStore) {
    _initDefineProp(this, 'contract', _descriptor, this);

    _initDefineProp(this, 'matches', _descriptor2, this);

    _initDefineProp(this, 'selectedMatch', _descriptor3, this);

    _initDefineProp(this, 'initialize', _descriptor4, this);

    _initDefineProp(this, 'currentBetting', _descriptor5, this);

    _initDefineProp(this, 'newMatchId', _descriptor6, this);

    _initDefineProp(this, 'addMatchMsg', _descriptor7, this);

    this.rootStore = rootStore;
  }

  init() {
    var _this = this;

    return _asyncToGenerator(function* () {
      let newContract = new _this.rootStore.dAppStore.web3.eth.Contract(_contractVariable.contractABI, _contractVariable.contractAddress, {
        data: _contractVariable.contractBytecode,
        from: _this.rootStore.dAppStore.web3.eth.getAccounts()[0],
        gas: 300000
      });
      _this.contract = newContract;
      let numberOfMatches = yield newContract.methods.matchesNumber().call();
      let matches = [];

      for (let i = 0; i < numberOfMatches; i++) {
        let match = yield newContract.methods.matches(i).call();
        const matchInfo = yield _axios2.default.get(`https://bounty-rune-bridge.herokuapp.com/result/dota/${match.matchId}`);

        matches.push(_extends({}, (yield matchInfo.data), (yield newContract.methods.matches(i).call())));
      }

      _this.matches = matches;
      _this.initialize = true;
    })();
  }

  changeRole(address) {
    return _asyncToGenerator(function* () {})();
  }

  setAddress(e) {}

  getMatch(matchId) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      let newContract = new _this2.rootStore.dAppStore.web3.eth.Contract(_contractVariable.contractABI, _contractVariable.contractAddress, {
        data: _contractVariable.contractBytecode,
        from: _this2.rootStore.dAppStore.web3.eth.getAccounts()[0],
        gas: 300000
      });
      const matchIndex = yield newContract.methods.matchIdToId(matchId).call();
      _this2.selectedMatch = _this2.matches[parseInt(matchIndex)];
    })();
  }

  bet(onRadiant) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      let newContract = new _this3.rootStore.dAppStore.web3.eth.Contract(_contractVariable.contractABI, _contractVariable.contractAddress, {
        data: _contractVariable.contractBytecode,
        from: _this3.rootStore.dAppStore.web3.eth.getAccounts()[0],
        gas: 300000
      });
      const bettings = yield newContract.methods.bet(_this3.selectedMatch.matchId, onRadiant).send({
        from: _this3.rootStore.dAppStore.address,
        value: _this3.currentBetting
      });
    })();
  }

  refund(onRadiant) {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      let newContract = new _this4.rootStore.dAppStore.web3.eth.Contract(_contractVariable.contractABI, _contractVariable.contractAddress, {
        data: _contractVariable.contractBytecode,
        from: _this4.rootStore.dAppStore.web3.eth.getAccounts()[0],
        gas: 300000
      });
      const refunds = yield newContract.methods.refund(_this4.selectedMatch.matchId, onRadiant, _this4.rootStore.dAppStore.address).send({
        from: _this4.rootStore.dAppStore.address
      });
    })();
  }

  setBet(e) {
    const value = e.target.value;
    this.currentBetting = _web2.default.utils.toWei(value);
  }

  setNewMatchId(e) {
    this.newMatchId = e.target.value;
  }

  addMatch() {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      let newContract = new _this5.rootStore.dAppStore.web3.eth.Contract(_contractVariable.contractABI, _contractVariable.contractAddress, {
        data: _contractVariable.contractBytecode,
        from: _this5.rootStore.dAppStore.web3.eth.getAccounts()[0],
        gas: 300000
      });
      try {
        let matchContract = newContract.methods;
        const matchInfo = yield _axios2.default.get(`https://bounty-rune-bridge.herokuapp.com/result/dota/${_this5.newMatchId}`);
        const matchData = matchInfo.data;
        _this5.addMatchMsg = "Please Wait";
        matchContract.addMatch(matchData.id).send({
          from: _this5.rootStore.dAppStore.address
        }).then(function () {
          _this5.addMatchMsg = "";
          (0, _sweetalert2.default)('Match Added', 'Match is existing and now can be betted', 'success');
        }).catch(function (err) {
          (0, _sweetalert2.default)({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong! either your addres is not registered as admin or match id is existed'
          });
        });
      } catch (err) {
        (0, _sweetalert2.default)({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        });
      }
    })();
  }

  startMatch() {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      let newContract = new _this6.rootStore.dAppStore.web3.eth.Contract(_contractVariable.contractABI, _contractVariable.contractAddress, {
        data: _contractVariable.contractBytecode,
        from: _this6.rootStore.dAppStore.web3.eth.getAccounts()[0],
        gas: 300000
      });
      try {
        let matchContract = newContract.methods;
        _this6.addMatchMsg = "Please Wait";
        matchContract.startMatch(_this6.selectedMatch.matchId).send({
          from: _this6.rootStore.dAppStore.address
        }).then(function () {
          _this6.addMatchMsg = "";
          (0, _sweetalert2.default)('Match Started', 'success');
        }).catch(function (err) {
          (0, _sweetalert2.default)({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          });
        });
      } catch (err) {
        (0, _sweetalert2.default)({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        });
      }
    })();
  }

  endMatch() {
    var _this7 = this;

    return _asyncToGenerator(function* () {
      try {
        _axios2.default.post(`http://localhost:4001/setWinner`, {
          matchId: _this7.selectedMatch.matchId
        }).then(function () {
          _this7.addMatchMsg = "";
          (0, _sweetalert2.default)('Match Started', 'success');
        }).catch(function (err) {
          (0, _sweetalert2.default)({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          });
        });
      } catch (err) {
        (0, _sweetalert2.default)({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        });
      }
    })();
  }

  withdraw() {
    var _this8 = this;

    return _asyncToGenerator(function* () {
      _axios2.default.post(`http://localhost:4001/getWinnings`, {
        matchId: _this8.selectedMatch.matchId,
        address: _this8.rootStore.dAppStore.address
      }).then(function (res) {
        (0, _sweetalert2.default)({
          type: 'success',
          title: 'Winnings Withdrawed',
          text: 'Check you balance in metamask!'
        });
      }).catch(function (err) {
        (0, _sweetalert2.default)({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!'
        });
      });
    })();
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'contract', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'matches', [_mobx.observable], {
  enumerable: true,
  initializer: function () {
    return [];
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'selectedMatch', [_mobx.observable], {
  enumerable: true,
  initializer: function () {
    return {
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
      withdrawable: false
    };
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'initialize', [_mobx.observable], {
  enumerable: true,
  initializer: function () {
    return false;
  }
}), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'currentBetting', [_mobx.observable], {
  enumerable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'newMatchId', [_mobx.observable], {
  enumerable: true,
  initializer: function () {
    return 0;
  }
}), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'addMatchMsg', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, 'init', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'init'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'changeRole', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'changeRole'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setAddress', [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, 'setAddress'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getMatch', [_dec4], Object.getOwnPropertyDescriptor(_class.prototype, 'getMatch'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'bet', [_dec5], Object.getOwnPropertyDescriptor(_class.prototype, 'bet'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'refund', [_dec6], Object.getOwnPropertyDescriptor(_class.prototype, 'refund'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setBet', [_dec7], Object.getOwnPropertyDescriptor(_class.prototype, 'setBet'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'setNewMatchId', [_dec8], Object.getOwnPropertyDescriptor(_class.prototype, 'setNewMatchId'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'addMatch', [_dec9], Object.getOwnPropertyDescriptor(_class.prototype, 'addMatch'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'startMatch', [_dec10], Object.getOwnPropertyDescriptor(_class.prototype, 'startMatch'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'endMatch', [_dec11], Object.getOwnPropertyDescriptor(_class.prototype, 'endMatch'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'withdraw', [_dec12], Object.getOwnPropertyDescriptor(_class.prototype, 'withdraw'), _class.prototype)), _class));
exports.default = MatchStore;