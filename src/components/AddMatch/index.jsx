import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import web3 from 'web3';
import getWeb3 from '../../utils/web3';

const AddMatchDiv = styled.div`
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

class AddMatch extends Component {
	render() {
		const { matchStore, rootStore, dAppStore } = this.props;
		return(
		<AddMatchDiv>
				<div id="addMatchInput">
					Add Match <input onChange={(e) => matchStore.setNewMatchId(e)}/>
				</div>
				<div id="addMatchButton">
					<button onClick={() => matchStore.addMatch()}>
						Add Match
					</button>
				</div>
		</AddMatchDiv>)
	}
}

export default inject('matchStore', 'rootStore', 'dAppStore')(observer(AddMatch));

