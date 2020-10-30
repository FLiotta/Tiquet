// Packages
import React from 'react';
import cn from 'classnames';

// Project
import Spinner from '../../assets/images/spinner.svg';
import './styles.scss'

interface LoadingProps {
  display?: Boolean
};

const Loading = ({ display }: LoadingProps): JSX.Element => (
  <div className={cn('loading', {
    'loading--hidden': !display
  })}>
    <img src={Spinner} />
  </div>
);

export default Loading;