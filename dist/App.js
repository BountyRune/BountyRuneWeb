'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _mobxReact = require('mobx-react');

var _MatchList = require('./components/Match/MatchList');

var _MatchList2 = _interopRequireDefault(_MatchList);

var _MatchInfo = require('./components/MatchInfo/');

var _MatchInfo2 = _interopRequireDefault(_MatchInfo);

var _AddMatch = require('./components/AddMatch');

var _AddMatch2 = _interopRequireDefault(_AddMatch);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

require('./App.css');

require('@babel/polyfill');

var _web3Eth = require('web3-eth');

var _web3Eth2 = _interopRequireDefault(_web3Eth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AppDiv = _styledComponents2.default.div`
#header {
  display: flex;
  flex-direction: row;
  height: 5%;
  margin: 0;
  overflow: hidden;
  padding: 20px 20px;
}

.menu {
  color: white;
  text-decoration: none;
}

.logo {
  font-size: 110%;
  color: white;
  text-decoration: none;
}

#menus {
  display: flex;
  margin-left: 60%;
  margin-right: 30px;
}

#logoItem {
  font-size: 18px;
  text-align: center;
  margin: 7px;
}

.menu:hover {
  border-bottom: 2px solid #a6e1fa;
  padding-bottom: 5px;
  text-decoration: bold;
}

#errorMetamask {
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
`;

let App = class App extends _react.Component {
  render() {
    const { matchStore, rootStore, dAppStore } = this.props;
    return _react2.default.createElement(
      _reactRouterDom.HashRouter,
      null,
      _react2.default.createElement(
        AppDiv,
        null,
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { id: 'header' },
            _react2.default.createElement(
              _reactRouterDom.Link,
              { className: 'logo ', to: '/' },
              ' Bounty Rune Betting Website '
            ),
            _react2.default.createElement(
              'div',
              { id: 'menus' },
              _react2.default.createElement(
                'div',
                { id: 'logoItem' },
                _react2.default.createElement(
                  _reactRouterDom.Link,
                  { className: 'menu', to: '/addMatch' },
                  'Add Match '
                )
              )
            )
          )
        ),
        dAppStore.address ? _react2.default.createElement(
          'div',
          { id: 'app' },
          _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _MatchList2.default }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/matchInfo', component: _MatchInfo2.default }),
          _react2.default.createElement(_reactRouterDom.Route, { path: '/addMatch', component: _AddMatch2.default })
        ) : _react2.default.createElement(
          'div',
          { id: 'errorMetamask' },
          'Install or Login in metamask'
        )
      )
    );
  }
};
exports.default = (0, _mobxReact.inject)('matchStore', 'rootStore', 'dAppStore')((0, _mobxReact.observer)(App));