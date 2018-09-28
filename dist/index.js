'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('./index.css');

var _mobxReact = require('mobx-react');

var _RootStore = require('./stores/RootStore');

var _RootStore2 = _interopRequireDefault(_RootStore);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _web = require('./utils/web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rootStore = new _RootStore2.default();
window.rootStore = rootStore;

_web2.default.then(res => {
  rootStore.dAppStore.addWeb3(res.web3Instance);
  rootStore.dAppStore.getAddress();
  rootStore.matchStore.init();
}).catch(console.log);

_reactDom2.default.render(_react2.default.createElement(
  _mobxReact.Provider,
  _extends({ rootStore: rootStore }, rootStore),
  _react2.default.createElement(_App2.default, null)
), document.getElementById('root'));