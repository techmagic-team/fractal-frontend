import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ errorMessage }) => (
  <div className="alert alert-danger" role="alert">
    Request failed{errorMessage ? `: ${errorMessage}` : ''}
  </div>
);

Error.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

export default Error;
