import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Context } from '../../context';
import { getCompanies } from '../../services/api';

import Error from '../Error';

class CompaniesList extends Component {
  static contextType = Context;

  state = {
    companies: [],
    requestError: null,
  };

  componentDidMount() {
    getCompanies()
      .then(resp => {
        this.setState({
          companies: JSON.parse(resp.data.body),
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
    const { setCompanyId } = this.props;
    const companyId = Number(e.target.dataset.companyId);

    setCompanyId(companyId);
    gotoNextScreen();
  };

  render() {
    const { companies, requestError } = this.state;

    if (requestError) {
      return <Error errorMessage={requestError.errMessage} />;
    }

    if (!companies.length) return null;

    return (
      <Fragment>
        <h5>Select company from list:</h5>
        <div className="list-group" onClick={this.onClick}>
          {companies.map(({ id, name }) => (
            <button
              type="button"
              className="list-group-item list-group-item-action"
              key={id}
              data-company-id={id}
            >
              {name}
            </button>
          ))}
        </div>
      </Fragment>
    );
  }
}

CompaniesList.propTypes = {
  setCompanyId: PropTypes.func.isRequired,
};

export default CompaniesList;
