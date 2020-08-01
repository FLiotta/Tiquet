// @Packages
import React from 'react';
import cn from 'classnames';
import propTypes from 'prop-types';

// @Project
import '../styles/components/Loading.scss'

const Loading = ({ display }) => (
  <div className={cn('loading', {
    'loading--hidden': !display
  })}>
    <div className="spinner-border text-primary" role="status"></div>
  </div>
)

Loading.propTypes = {
  display: propTypes.bool,
}

export default Loading;