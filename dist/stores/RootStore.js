'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DAppStore = require('./DAppStore');

var _DAppStore2 = _interopRequireDefault(_DAppStore);

var _MatchStore = require('./MatchStore');

var _MatchStore2 = _interopRequireDefault(_MatchStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import getWeb3 from '../utils/web3';

let RootStore = class RootStore {
  constructor() {
    this.dAppStore = new _DAppStore2.default(this);
    this.matchStore = new _MatchStore2.default(this);
  }
};
exports.default = RootStore;