'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _mobxReact = require('mobx-react');

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MatchInfoDiv = _styledComponents2.default.div`
  padding: 2em;
  margin: 2em;
	color: white;
  justify-content: space-around;
  grid-template-areas: 
	'radiantTeamLogo matchId direTeamLogo'
  'radiantTeamName result direTeamName'
	'radiantBets poolPrice direBets'
  'radiantPlayers . direPlayers'
  'radiantBetButton bettings direBetButton'
  'radiantRefundButton matchOptions direRefundButton'
  'radiantWithdrawButton . direWithdrawButton';
  grid-auto-rows: 1fr 1fr 1hr;
  grid-row-gap: 50px;
  grid-auto-columns: 1fr 1fr 1fr 1fr 1fr;
  display: grid;
  border: 2px solid #9CA3DB;
	border-radius: 5px;


  @media screen and (min-width: 700px) {
    margin: 0;
    flex-wrap: wrap;
  }

  @media screen and (max-width: 700px) { 
    flex-direction: column;
    align-content: center;
  }

  #matchId {
    grid-area: matchId;
  }

  #radiantTeamName {
    grid-area: radiantTeamName;
  }

  #radiantBets {
    grid-area: radiantBets;
  }

  #radiantPlayers {
    grid-area: radiantPlayers;
  }

  #direTeamName {
    grid-area: direTeamName;
  }

  #direBets {
    grid-area: direBets;
  }

  #direPlayers {
    grid-area: direPlayers;
  }

  #radiantBetButton {
    grid-area: radiantBetButton;
  }

  #direBetButton {
    grid-area: direBetButton;
  }

  #poolPrice {
    grid-area: poolPrice;
  }

  #result {
    grid-area: result;
  }  

  #radiantTeamLogo {
    grid-area: radiantTeamLogo;
  }

  #direTeamLogo {
    grid-area: direTeamLogo;
  }

  #bettings {
    grid-area: bettings;
    margin: 1em;
    align-content: center;
  }

  #radiantRefundButton{
    grid-area: radiantRefundButton;
  }

  #direRefundButton{
    grid-area:  direRefundButton;
  }

  #matchOptions {
    grid-area: matchOptions;
  }

  #radiantWithdrawButton {
    grid-area: radiantWithdrawButton;
  }

  #direWithdrawButton {
    grid-area: direWithdrawButton;
  }
`;

let MatchInfo = class MatchInfo extends _react.Component {

  render() {
    let match;
    const { matchStore, rootStore, dAppStore } = this.props;
    if (matchStore.matches.length <= 0) {
      window.location.replace("http://localhost:5000/#/");
      return _react2.default.createElement('div', null);
    }
    matchStore.getMatch(window.location.href.split('/')[5]);
    return _react2.default.createElement(
      MatchInfoDiv,
      null,
      _react2.default.createElement(
        'div',
        { id: 'result' },
        matchStore.selectedMatch.radiantWin || matchStore.selectedMatch.direWin ? _react2.default.createElement(
          'div',
          null,
          matchStore.selectedMatch.msg
        ) : _react2.default.createElement(
          'div',
          null,
          matchStore.selectedMatch.refundable && matchStore.selectedMatch.bettable ? _react2.default.createElement(
            'div',
            null,
            ' Game Not Started '
          ) : _react2.default.createElement(
            'div',
            null,
            'On going'
          )
        )
      ),
      _react2.default.createElement(
        'div',
        { id: 'matchId' },
        matchStore.selectedMatch.matchId
      ),
      _react2.default.createElement('img', { id: 'radiantTeamLogo', src: `${matchStore.selectedMatch.radiantTeam.logo_url}`, height: '100', width: '100' }),
      _react2.default.createElement(
        'div',
        { id: 'radiantTeamName' },
        matchStore.selectedMatch.radiantTeam.name
      ),
      _react2.default.createElement(
        'div',
        { id: 'radiantBets' },
        _web2.default.utils.fromWei(matchStore.selectedMatch.radiantBets),
        ' ETH'
      ),
      _react2.default.createElement(
        'div',
        { id: 'radiantPlayers' },
        matchStore.selectedMatch.radiantPlayers.length < 0 ? _react2.default.createElement(
          'div',
          null,
          'Loading'
        ) : _react2.default.createElement(
          'div',
          null,
          matchStore.selectedMatch.radiantPlayers.map(player => _react2.default.createElement(
            'div',
            null,
            player.name,
            ' - ',
            player.kills,
            '/',
            player.assists,
            '/',
            player.deaths
          ))
        )
      ),
      _react2.default.createElement(
        'div',
        { id: 'radiantBetButton' },
        matchStore.selectedMatch.refundable && matchStore.selectedMatch.bettable ? _react2.default.createElement(
          'button',
          { onClick: () => matchStore.bet(true) },
          ' BET '
        ) : _react2.default.createElement('div', null)
      ),
      _react2.default.createElement(
        'div',
        { id: 'radiantRefundButton' },
        matchStore.selectedMatch.refundable && matchStore.selectedMatch.bettable ? _react2.default.createElement(
          'button',
          { onClick: () => matchStore.refund(true) },
          ' REFUND '
        ) : _react2.default.createElement('div', null)
      ),
      _react2.default.createElement(
        'div',
        { id: 'radiantWithdrawButton' },
        matchStore.selectedMatch.radiantWin || matchStore.selectedMatch.direWin ? _react2.default.createElement(
          'button',
          { onClick: () => matchStore.withdraw() },
          ' WITHDRAW '
        ) : _react2.default.createElement('div', null)
      ),
      _react2.default.createElement(
        'div',
        { id: 'poolPrice' },
        _web2.default.utils.fromWei(matchStore.selectedMatch.poolPrice),
        ' ETH'
      ),
      _react2.default.createElement('img', { id: 'direTeamLogo', src: `${matchStore.selectedMatch.direTeam.logo_url}`, height: '100', width: '100' }),
      _react2.default.createElement(
        'div',
        { id: 'direTeamName' },
        matchStore.selectedMatch.direTeam.name
      ),
      _react2.default.createElement(
        'div',
        { id: 'direBets' },
        _web2.default.utils.fromWei(matchStore.selectedMatch.direBets),
        ' ETH'
      ),
      _react2.default.createElement(
        'div',
        { id: 'direPlayers' },
        matchStore.selectedMatch.direPlayers.length < 0 ? _react2.default.createElement(
          'div',
          null,
          'Loading'
        ) : _react2.default.createElement(
          'div',
          null,
          matchStore.selectedMatch.direPlayers.map(player => _react2.default.createElement(
            'div',
            null,
            player.kills,
            '/',
            player.assists,
            '/',
            player.deaths,
            ' - ',
            player.name
          ))
        )
      ),
      _react2.default.createElement(
        'div',
        { id: 'direBetButton' },
        matchStore.selectedMatch.refundable && matchStore.selectedMatch.bettable ? _react2.default.createElement(
          'button',
          { onClick: () => matchStore.bet(false) },
          ' BET '
        ) : _react2.default.createElement('div', null)
      ),
      _react2.default.createElement(
        'div',
        { id: 'direRefundButton' },
        matchStore.selectedMatch.refundable && matchStore.selectedMatch.bettable ? _react2.default.createElement(
          'button',
          { onClick: () => matchStore.refund(false) },
          ' REFUND '
        ) : _react2.default.createElement('div', null)
      ),
      _react2.default.createElement(
        'div',
        { id: 'direWithdrawButton' },
        matchStore.selectedMatch.radiantWin || matchStore.selectedMatch.direWin ? _react2.default.createElement(
          'button',
          { onClick: () => matchStore.withdraw() },
          ' WITHDRAW '
        ) : _react2.default.createElement('div', null)
      ),
      _react2.default.createElement(
        'div',
        { id: 'bettings' },
        _react2.default.createElement('input', { placeholder: 'IN ETH', onChange: e => matchStore.setBet(e), type: 'number' })
      ),
      _react2.default.createElement(
        'div',
        { id: 'matchOptions' },
        _react2.default.createElement(
          'button',
          { onClick: () => matchStore.startMatch() },
          ' Start Match '
        ),
        _react2.default.createElement(
          'button',
          { onClick: () => matchStore.endMatch() },
          ' End Match '
        )
      )
    );
  }
};
exports.default = (0, _mobxReact.inject)('matchStore', 'rootStore', 'dAppStore')((0, _mobxReact.observer)(MatchInfo));