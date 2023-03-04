import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';

import toolkitStore, { persistor } from './store';
import './index.css';
import App from './App';

ReactDOM.render(
  <Provider store={toolkitStore}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
