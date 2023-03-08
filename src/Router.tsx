import React from 'react';
import { Route } from 'react-router-dom';
import List from './pages/List';
import Chart from './pages/Chart';
import { LanguageProvider } from './multiLanguage/LanguageProvider';

const Routes = () => (
  <>
    <LanguageProvider>
      <Route path="/tasklist" exact>
        <List />
      </Route>
      <Route path="/chart" exact>
        <Chart />
      </Route>
      <Route path="/" exact>
        <List />
      </Route>
    </LanguageProvider>
  </>
);

export default Routes;
