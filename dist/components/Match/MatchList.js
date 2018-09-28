'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _mobxReact = require('mobx-react');

var _Match = require('./Match');

var _Match2 = _interopRequireDefault(_Match);

var _web = require('../../utils/web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MatchListDiv = _styledComponents2.default.div`
  height: 100%;
  display: flex;
  justify-content: space-around;
  color: white;  
  @media screen and (min-width: 700px) {
    margin: 0;
    flex-wrap: wrap;
  }

  @media screen and (max-width: 700px) { 
    flex-direction: column;
    align-content: center;
  }
`;

let MatchList = class MatchList extends _react.Component {
  render() {
    const { matchStore } = this.props;
    return _react2.default.createElement(
      MatchListDiv,
      null,
      matchStore.matches.length < 0 ? _react2.default.createElement(
        'div',
        { id: 'noMatch' },
        'No matches'
      ) : matchStore.matches.map((match, index) => _react2.default.createElement(_Match2.default, { match: match, key: index }))
    );
  }
};
exports.default = (0, _mobxReact.inject)('matchStore', 'rootStore')((0, _mobxReact.observer)(MatchList));