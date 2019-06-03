import React, { Component, Fragment } from 'react';

import { Context } from '../../context';
import { getTransactions } from '../../services/api';

import Error from '../Error';

class TransactionsTable extends Component {
  static contextType = Context;

  state = {
    transactions: [],
    requestError: null,
  };

  componentDidMount() {
    const { bankId, companyId, accountId } = this.context;

    getTransactions({ bankId, companyId, accountId })
      .then(resp => {
        this.setState({
          transactions: this.sortByDate(JSON.parse(resp.data.body).results),
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

  sortByDate = transactions => {
    return transactions.sort((a, b) => {
      const dateA = new Date(a.bookingDate).getTime();
      const dateB = new Date(b.bookingDate).getTime();

      return dateB - dateA;
    });
  };

  render() {
    const { transactions, requestError } = this.state;

    if (requestError) {
      return <Error errorMessage={requestError.errMessage} />;
    }

    if (!transactions.length) return null;

    return (
      <Fragment>
        <h5>List of transactions:</h5>
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Merchant</th>
              <th scope="col">Description</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.transactionId}>
                <td>{index}</td>
                <td>{transaction.bookingDate}</td>
                <td>{transaction.merchant.name}</td>
                <td>{transaction.description}</td>
                <td>{`${transaction.amount} ${transaction.currencyCode}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default TransactionsTable;
