// @Packages
import React from 'react';
import cn from 'classnames';
import propTypes from 'prop-types';

import '../styles/components/Loading.scss'

const Loading = ({ display }) => (
  <div className={cn('loading', {
    'loading--hidden': !display
  })}>
  </div>
)

Loading.propTypes = {
  display: propTypes.bool,
}

export default Loading;