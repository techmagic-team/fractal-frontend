import React, { Component } from 'react';

import { Provider } from '../../context';
import { addInterceptors } from '../../services/api';

import Loading from '../Loading';
import Login from '../Login';
import CompaniesList from '../CompaniesList';
import AccountsList from '../AccountsList';
import TransactionsTable from '../TransactionsTable';

import { AppWrapper } from './style';

const screens = {
  LOGIN: 0,
  COMPANIES_LIST: 1,
  ACCOUNTS_LIST: 2,
  TRANSACTIONS_TABLE: 3,
};

class App extends Component {
  state = {
    isFetching: false,
    activeScreen: screens.LOGIN,
    bankId: 1,
    companyId: null,
    accountId: null,
  };

  componentDidMount() {
    addInterceptors({ onRequest: this.onRequest, onResponse: this.onResponse });
  }

  onRequest = () => {
    this.setState({ isFetching: true });
  };

  onResponse = () => {
    this.setState({ isFetching: false });
  };

  gotoNextScreen = () => {
    this.setState(state => {
      const nextScreen = state.activeScreen + 1;
      if (nextScreen >= Object.keys(screens).length) {
        return {};
      } else {
        return {
          activeScreen: nextScreen,
        };
      }
    });
  };

  gotoPrevScreen = () => {
    this.setState(state => {
      const prevScreen = state.activeScreen - 1;
      if (prevScreen < 0) {
        return {};
      } else {
        return {
          activeScreen: prevScreen,
        };
      }
    });
  };

  setCompanyId = companyId => {
    this.setState({ companyId });
  };

  setAccountId = accountId => {
    this.setState({ accountId });
  };

  getScreen = () => {
    const { activeScreen } = this.state;

    switch (activeScreen) {
      case screens.COMPANIES_LIST:
        return <CompaniesList setCompanyId={this.setCompanyId} />;
      case screens.ACCOUNTS_LIST:
        return <AccountsList setAccountId={this.setAccountId} />;
      case screens.TRANSACTIONS_TABLE:
        return <TransactionsTable />;
      case screens.LOGIN:
      default:
        return <Login />;
    }
  };

  render() {
    const {
      isFetching,
      activeScreen,
      bankId,
      companyId,
      accountId,
    } = this.state;

    return (
      <Provider
        value={{
          gotoNextScreen: this.gotoNextScreen,
          bankId,
          companyId,
          accountId,
        }}
      >
        <AppWrapper className="container shadow p-3 mb-5 bg-white rounded">
          {activeScreen > 0 && (
            <button
              type="button"
              className="btn btn-secondary btn-sm mb-4"
              onClick={this.gotoPrevScreen}
            >
              Back
            </button>
          )}
          {this.getScreen()}
        </AppWrapper>
        {isFetching && <Loading />}
      </Provider>
    );
  }
}

export default App;
