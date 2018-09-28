'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _mobxReact = require('mobx-react');

var _reactRouterDom = require('react-router-dom');

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MatchDiv = _styledComponents2.default.div`
  padding: 2em;
  margin: 3em;
	height: 30%;
	color: white;
  display: flex;
  text-align: center;
	justify-content: space-around;
	grid-template-areas: 
	'radiantTeamLogo result direTeamLogo'
  'radiantTeam versus direTeam'
  '. matchId .'
  '. pricePool .'
	'. link .';
  grid-auto-rows: 1fr 1fr 1hr;
  grid-row-gap: 1em;
  grid-auto-columns: 1fr 1fr 1fr;
	display: grid;
	border: 2px solid #9CA3DB;
	border-radius: 5px;
	
	#matchId {
		grid-area: matchId;
	}

	#radiantTeam {
		grid-area: radiantTeam;
	}

	#versus {
		grid-area: versus;
	}

	#direTeam {
		grid-area: direTeam;
	}

	#result {
		grid-area: result;
	}

	#link {
		grid-area: link;	
	}

	#radiantTeamLogo {
		grid-area: radiantTeamLogo;
	}

	#direTeamLogo {
		grid-area: direTeamLogo;
  }
  
  #pricePool {
    grid-area: pricePool;
  }
`;

const StyledNavLink = (0, _styledComponents2.default)(_reactRouterDom.NavLink)`
  text-decoration: none;
  color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  :hover {
   color: #d49059;
  }
`;

const Match = ({ match, matchStore }) => _react2.default.createElement(
	MatchDiv,
	null,
	_react2.default.createElement(
		'div',
		{ id: 'matchId' },
		'Match ID: ',
		match.matchId
	),
	_react2.default.createElement('img', { id: 'radiantTeamLogo', src: `${match.radiantTeam.logo_url}`, height: '100', width: '100' }),
	_react2.default.createElement(
		'div',
		{ id: 'radiantTeam' },
		'Radiant: ',
		match.radiantTeam.name
	),
	_react2.default.createElement(
		'div',
		{ id: 'versus' },
		'VS'
	),
	_react2.default.createElement('img', { id: 'direTeamLogo', src: `${match.direTeam.logo_url}`, height: '100', width: '100' }),
	_react2.default.createElement(
		'div',
		{ id: 'direTeam' },
		'Dire: ',
		match.direTeam.name
	),
	_react2.default.createElement(
		'div',
		{ id: 'result' },
		match.radiantWin || match.direWin ? _react2.default.createElement(
			'div',
			{ id: 'result' },
			match.msg
		) : _react2.default.createElement(
			'div',
			{ id: 'result' },
			match.refundable && match.bettable ? _react2.default.createElement(
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
		{ id: 'pricePool' },
		'Pool Price: ',
		_web2.default.utils.fromWei(match.poolPrice),
		' ETH'
	),
	_react2.default.createElement(
		'div',
		{ id: 'link' },
		_react2.default.createElement(
			StyledNavLink,
			{ to: `/matchInfo/${match.matchId}` },
			'Get Match Info'
		)
	)
);

exports.default = (0, _mobxReact.inject)('rootStore')((0, _mobxReact.observer)(Match));