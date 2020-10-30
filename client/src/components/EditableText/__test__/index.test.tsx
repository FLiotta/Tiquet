// Packages
import * as React from 'react';
import { render } from '@testing-library/react';

// Project
import EditableText from '../index';


describe('<EditableText />', () => {
  it('Matches snapshot', () => {
    const { container } = render(
      <EditableText
        text="test text"
        tag="p"
        onSuccess={jest.fn()}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});