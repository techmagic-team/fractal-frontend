import React from 'react';
import { create } from 'react-test-renderer';

import Loading from './index';

describe('Loading', () => {
  it('should match the snapshot', () => {
    const component = create(<Loading />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
