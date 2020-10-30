// Packages
import * as React from 'react';
import { render } from '@testing-library/react';

// Project
import GithubOAuth from '../index';


describe('<GithubOAuth />', () => {
  it('Matches snapshot', () => {
    const { container } = render(
      <GithubOAuth onSuccess={jest.fn()} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('Receives text', () => {
    const testText = 'testText';

    const { container } = render(
      <GithubOAuth onSuccess={jest.fn()} text={testText} />
    );

    expect(container.firstChild).toHaveTextContent('testText');
  });
});