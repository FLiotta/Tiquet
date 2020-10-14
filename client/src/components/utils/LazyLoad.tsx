import React, { ComponentType, Suspense } from 'react';
import Loading from '../Loading';

interface ILazyLoad {
  Component: ComponentType
}

const LazyLoad = (Component): JSX.Element => (
  <Suspense fallback="loading">
    <Component />
  </Suspense>
)

export default LazyLoad;