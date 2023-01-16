import React from 'react';
import { Route } from 'react-router-dom';
import List from './pages/List';
import Chart from './pages/Chart';

const Routes = () => (
  <>
    <Route path="/tasklist" exact>
      <List />
    </Route>
    <Route path="/chart" exact>
      <Chart />
    </Route>
    <Route path="/" exact>
      <List />
    </Route>
  </>
);

export default Routes;
