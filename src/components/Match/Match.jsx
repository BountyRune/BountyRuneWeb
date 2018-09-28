import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';
import web3 from 'web3';

const MatchDiv = styled.div`
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

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  :hover {
   color: #d49059;
  }
`;


const Match = ({ match, matchStore }) => (
	<MatchDiv >
		
		<div id="matchId">Match ID: {match.matchId}</div>
		<img id="radiantTeamLogo" src={`${match.radiantTeam.logo_url}`} height="100" width="100"></img>
		<div id="radiantTeam">Radiant: {match.radiantTeam.name}</div>
		<div id="versus">VS</div>
		<img id="direTeamLogo" src={`${match.direTeam.logo_url}`} height="100" width="100"></img>
		<div id="direTeam">Dire: {match.direTeam.name}</div>
		<div id="result">
			{
				match.radiantWin || match.direWin ?
					<div id="result">
						{match.msg}
					</div> :
					<div id="result">
						{
							match.refundable && match.bettable ?
							<div> Game Not Started </div> :
							<div>On going</div>
						}
					</div>
			}
			</div>
			<div id="pricePool">
				Pool Price: {web3.utils.fromWei(match.poolPrice)} ETH
			</div>
			<div id="link">
				<StyledNavLink to={`/matchInfo/${match.matchId}`}>
						Get Match Info
				</StyledNavLink>
			</div>

	</MatchDiv>
);

export default inject('rootStore')(observer(Match));
