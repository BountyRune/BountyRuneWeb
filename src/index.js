import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'mobx-react';
import RootStore from './stores/RootStore';
import App from './App';
import getWeb3 from './utils/web3';

const rootStore = new RootStore();
window.rootStore = rootStore;

getWeb3
  .then((res) => {
    rootStore.dAppStore.addWeb3(res.web3Instance);
    rootStore.dAppStore.getAddress();
    rootStore.matchStore.init();
  })
  .catch(console.log)


ReactDOM.render(
<Provider rootStore={rootStore} {...rootStore}>
    <App />
</Provider>
, document.getElementById('root'));
