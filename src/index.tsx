import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import '@fortawesome/fontawesome-free/css/all.min.css';

import App from './App';
import toolkitStore, { persistor } from './store';
import './index.css';

ReactDOM.render(
  <Provider store={toolkitStore}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
