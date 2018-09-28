import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import MatchList from './components/Match/MatchList';
import MatchInfo from './components/MatchInfo/';
import AddMatch from './components/AddMatch';
import styled from 'styled-components';
import './App.css';
import "@babel/polyfill";
import eth from 'web3-eth';

const AppDiv = styled.div`
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

class App extends Component {
  render() {
    const {matchStore, rootStore, dAppStore} = this.props;
    return (
      <Router>
        <AppDiv>
        <div>
            <div id="header">
              <Link className="logo "to="/"> Bounty Rune Betting Website </Link>
		          <div id="menus">
                <div id="logoItem">
                  <Link className='menu' to="/addMatch">Add Match </Link>
                </div>
              </div>
	          </div> 
          </div>

          {
            dAppStore.address ?
            <div id="app">
            <Route exact path="/" component={MatchList} />
            <Route path="/matchInfo" component={MatchInfo} />
            <Route path="/addMatch" component={AddMatch} />
          </div>
            :
            <div id="errorMetamask">
              Install or Login in metamask
            </div>
          }
        </AppDiv>
      </Router>
    );
  }
}

export default inject('matchStore', 'rootStore', 'dAppStore')(observer(App));
