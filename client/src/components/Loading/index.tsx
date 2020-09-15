// Packages
import React from 'react';
import cn from 'classnames';

// Project
import './styles.scss'

interface LoadingProps {
  display: Boolean
};

const Loading = ({ display }: LoadingProps): JSX.Element => (
  <div className={cn('loading', {
    'loading--hidden': !display
  })}>
    <div className="spinner-border text-primary" role="status"></div>
  </div>
);

export default Loading;