// Packages
import * as React from 'react';
import { render } from '@testing-library/react';

// Project
import Loading from '../index';


describe('<Loading />', () => {
  it('Matches snapshot', () => {
    const { container } = render(
      <Loading display />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('Not visible when false display prop', () => {
    const { container } = render(
      <Loading />
    );
    expect(container.firstChild).toHaveClass('loading--hidden');
  });
});