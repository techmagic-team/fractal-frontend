import React, { Component } from 'react';

import { Context } from '../../context';
import { getAccessToken, setAuthHeader } from '../../services/api';

import Error from '../Error';

class Login extends Component {
  static contextType = Context;

  state = {
    requestError: null
  };

  onClick = () => {
    const { gotoNextScreen } = this.context;

    getAccessToken()
      .then(resp => {
        const accessToken = JSON.parse(resp.data.body).access_token;

        setAuthHeader(accessToken);
        gotoNextScreen();
      })
      .catch(err => {
        this.setState({
          requestError: {
            errMessage: err.message || ''
          }
        });
      });
  };

  render() {
    const { requestError } = this.state;

    return (
      <div className="text-center">
        <h3>Fractal Transactions</h3>
        <h5>Press Login to proceed</h5>
        <button
          type="button"
          className="btn btn-primary m-3"
          onClick={this.onClick}
        >
          Login
        </button>
        {requestError && <Error errorMessage={requestError.errMessage} />}
      </div>
    );
  }
}

export default Login;
