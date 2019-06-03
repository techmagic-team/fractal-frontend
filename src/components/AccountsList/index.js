import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Context } from '../../context';
import { getBankAccounts } from '../../services/api';

import Error from '../Error';

class AccountsList extends Component {
  static contextType = Context;

  state = {
    accounts: [],
    requestError: null,
  };

  componentDidMount() {
    const { bankId, companyId } = this.context;

    getBankAccounts({ bankId, companyId })
      .then(resp => {
        this.setState({
          accounts: JSON.parse(resp.data.body).results,
        });
      })
      .catch(err => {
        this.setState({
          requestError: {
            errMessage: err.message || '',
          },
        });
      });
  }

  onClick = e => {
    const { gotoNextScreen } = this.context;
    const { setAccountId } = this.props;
    const accountId = e.target.dataset.accountId;

    setAccountId(accountId);
    gotoNextScreen();
  };

  render() {
    const { accounts, requestError } = this.state;

    if (requestError) {
      return <Error errorMessage={requestError.errMessage} />;
    }

    if (!accounts.length) return null;

    return (
      <Fragment>
        <h5>Select bank account from list:</h5>
        <div className="list-group" onClick={this.onClick}>
          {accounts.map(account => (
            <button
              type="button"
              className="list-group-item list-group-item-action"
              key={account.Account.Identification}
              data-account-id={account.AccountId}
            >
              {`${account.Account.Name} – ${account.Account.Identification}`}
            </button>
          ))}
        </div>
      </Fragment>
    );
  }
}

AccountsList.propTypes = {
  setAccountId: PropTypes.func.isRequired,
};

export default AccountsList;
