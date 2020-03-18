import React, { Suspense } from 'react';
import { Route, Switch, Router } from 'react-router-dom';

import history from './history';

import { routes } from './path';

// * Core components ->
import Root from 'Components/Root';
import NotFound from 'Components/NotFound';
import { Backdrop } from 'Components/Backdrop';
// import { Spinner } from 'Components/Spinner'; // ! This component does not exist yet
// * <- Core components

// * Lazy components ->
// Map
const WorldMap = React.lazy(() => import('Containers/WorldMap'));
// TimeLine
const TimeLine = React.lazy(() => import('Containers/TimeLine'));
// * <- Lazy components

type RoutesProps = {};

const Routes: React.FC<RoutesProps> = (props: RoutesProps) => {
  const preloadingComponent = (
    <Backdrop overflowAll>
      <p>Loading...</p>
    </Backdrop>
  );

  return (
    <Router history={history}>
      <Root>
        <Suspense fallback={preloadingComponent}>
          <Switch>
            <Route path={routes.home} exact>
              <WorldMap />
            </Route>
            <Route path={routes.timeline} exact>
              <TimeLine />
            </Route>
            <Route path={'*'} exact>
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Root>
    </Router>
  );
};

export default Routes;
