import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import web3 from 'web3';

const MatchInfoDiv = styled.div`
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

class MatchInfo extends Component {

  render() {
    let match;
    const { matchStore, rootStore, dAppStore } = this.props;
    if (matchStore.matches.length <= 0) {
      window.location.replace("http://localhost:5000/#/");
      return (<div></div>)
    }
    matchStore.getMatch(window.location.href.split('/')[5]);
    return (
      <MatchInfoDiv>
        <div id="result">
          {
            matchStore.selectedMatch.radiantWin || matchStore.selectedMatch.direWin ?
              <div>
                {matchStore.selectedMatch.msg}
              </div> :
              <div>
                {
                  matchStore.selectedMatch.refundable && matchStore.selectedMatch.bettable ?
                    <div> Game Not Started </div> :
                    <div>On going</div>
                }
              </div>
          }
        </div>
        <div id="matchId">{matchStore.selectedMatch.matchId}</div>
        <img id="radiantTeamLogo" src={`${matchStore.selectedMatch.radiantTeam.logo_url}`} height="100" width="100"></img>
        <div id="radiantTeamName">{matchStore.selectedMatch.radiantTeam.name}</div>
        <div id="radiantBets">{web3.utils.fromWei(matchStore.selectedMatch.radiantBets)} ETH</div>
        <div id="radiantPlayers">
          {
            matchStore.selectedMatch.radiantPlayers.length < 0 ?
              <div>
                Loading
            </div> :
              <div>
                {
                  matchStore.selectedMatch.radiantPlayers.map((player) => (
                    <div>
                      {player.name} - {player.kills}/{player.assists}/{player.deaths}
                    </div>
                  ))
                }
              </div>
          }
        </div>

        <div id="radiantBetButton">
          {
            matchStore.selectedMatch.refundable && matchStore.selectedMatch.bettable ?
              <button onClick={() => matchStore.bet(true)}> BET </button>
              :
              <div />
          }

        </div>
        <div id="radiantRefundButton">
          {
            matchStore.selectedMatch.refundable && matchStore.selectedMatch.bettable ?
              <button onClick={() => matchStore.refund(true)}> REFUND </button>
              :
              <div />
          }
        </div>
        <div id="radiantWithdrawButton">
          {
            matchStore.selectedMatch.radiantWin || matchStore.selectedMatch.direWin ?
              <button onClick={() => matchStore.withdraw()}> WITHDRAW </button>
              :
              <div />
          }
        </div>
        <div id="poolPrice">{web3.utils.fromWei(matchStore.selectedMatch.poolPrice)} ETH</div>
        <img id="direTeamLogo" src={`${matchStore.selectedMatch.direTeam.logo_url}`} height="100" width="100"></img>
        <div id="direTeamName">{matchStore.selectedMatch.direTeam.name}</div>
        <div id="direBets">{web3.utils.fromWei(matchStore.selectedMatch.direBets)} ETH</div>
        <div id="direPlayers">
          {
            matchStore.selectedMatch.direPlayers.length < 0 ?
              <div>
                Loading
            </div> :
              <div>
                {
                  matchStore.selectedMatch.direPlayers.map((player) => (
                    <div>
                      {player.kills}/{player.assists}/{player.deaths} - {player.name}
                    </div>
                  ))
                }
              </div>
          }
        </div>
        <div id="direBetButton">
          {
            matchStore.selectedMatch.refundable && matchStore.selectedMatch.bettable ?
              <button onClick={() => matchStore.bet(false)}> BET </button>
              :
              <div />
          }

        </div>
        <div id="direRefundButton">
          {
            matchStore.selectedMatch.refundable && matchStore.selectedMatch.bettable ?
              <button onClick={() => matchStore.refund(false)}> REFUND </button>
              :
              <div />
          }

        </div>
        <div id="direWithdrawButton">
          {
            matchStore.selectedMatch.radiantWin || matchStore.selectedMatch.direWin ?
              <button onClick={() => matchStore.withdraw()}> WITHDRAW </button>
              :
              <div />
          }
        </div>
        <div id="bettings">
          <input placeholder="IN ETH" onChange={(e) => matchStore.setBet(e)} type="number" />
        </div>
        <div id="matchOptions">
          <button onClick={() => matchStore.startMatch()}> Start Match </button>
          <button onClick={() => matchStore.endMatch()}> End Match </button>
        </div>
      </MatchInfoDiv>
    )
  }
}

export default inject('matchStore', 'rootStore', 'dAppStore')(observer(MatchInfo));