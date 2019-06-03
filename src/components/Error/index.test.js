import React from 'react';
import { create } from 'react-test-renderer';

import Error from './index';

describe('Error', () => {
  it('should match the snapshot without errorMessage', () => {
    const errorMessage = '';
    const component = create(<Error errorMessage={errorMessage} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should match the snapshot with errorMessage', () => {
    const errorMessage = 'Network error';
    const component = create(<Error errorMessage={errorMessage} />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
