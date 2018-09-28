'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _mobxReact = require('mobx-react');

var _mobx = require('mobx');

var _web = require('web3');

var _web2 = _interopRequireDefault(_web);

var _web3 = require('../../utils/web3');

var _web4 = _interopRequireDefault(_web3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AddMatchDiv = _styledComponents2.default.div`
padding: 2em;
margin: 2em;
color: white;
border: 2px solid #9CA3DB;
border-radius: 5px;
align-items: center;
justify-content: center;

display: flex;

@media screen and (min-width: 700px) {
	margin: 0;
	flex-wrap: wrap;
}

@media screen and (max-width: 700px) { 
	flex-direction: column;
	align-content: center;
}

#addMatchInput {
	grid-area: addMatchInput;
	align-content: center;
}

#addMatchButton {
	grid-area: addMatchButton;
	align-content: center;
}
`;

let AddMatch = class AddMatch extends _react.Component {
	render() {
		const { matchStore, rootStore, dAppStore } = this.props;
		return _react2.default.createElement(
			AddMatchDiv,
			null,
			_react2.default.createElement(
				'div',
				{ id: 'addMatchInput' },
				'Add Match ',
				_react2.default.createElement('input', { onChange: e => matchStore.setNewMatchId(e) })
			),
			_react2.default.createElement(
				'div',
				{ id: 'addMatchButton' },
				_react2.default.createElement(
					'button',
					{ onClick: () => matchStore.addMatch() },
					'Add Match'
				)
			)
		);
	}
};
exports.default = (0, _mobxReact.inject)('matchStore', 'rootStore', 'dAppStore')((0, _mobxReact.observer)(AddMatch));