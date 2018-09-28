'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dec, _dec2, _desc, _value, _class, _descriptor, _descriptor2;

var _mobx = require('mobx');

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

let DAppStore = (_dec = _mobx.action.bound, _dec2 = _mobx.action.bound, (_class = class DAppStore {

  constructor(rootStore) {
    _initDefineProp(this, 'web3', _descriptor, this);

    _initDefineProp(this, 'address', _descriptor2, this);

    this.rootStore = rootStore;
  }

  addWeb3(web3) {
    this.web3 = web3;
  }

  getAddress() {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (!_this.address) {

        _this.address = yield _this.web3.eth.getCoinbase();
      }
      return _this.address;
    })();
  }
}, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'web3', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'address', [_mobx.observable], {
  enumerable: true,
  initializer: null
}), _applyDecoratedDescriptor(_class.prototype, 'addWeb3', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'addWeb3'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'getAddress', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'getAddress'), _class.prototype)), _class));
exports.default = DAppStore;