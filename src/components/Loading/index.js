import React from 'react';

import { SpinnerWrapper } from './style';

const Loading = () => (
  <SpinnerWrapper>
    <div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </SpinnerWrapper>
);

export default Loading;
