import React, { Component } from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import Match from './Match';
import getWeb3 from '../../utils/web3';

const MatchListDiv = styled.div`
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

class MatchList extends Component {
  render() {
    const { matchStore } = this.props;
    return (
      <MatchListDiv>
        {
          matchStore.matches.length < 0 ?
          <div id="noMatch">
            No matches
          </div> :
          matchStore.matches.map((match, index) => (
            <Match match={match} key={index} />
          ))
        }
      </MatchListDiv>
    )
  }
}

export default inject('matchStore', 'rootStore')(observer(MatchList));