/* global document */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/es/integration/react';

import configureStore from '../store/index';
import registerServiceWorker from './register-service-worker';
import Routes from './routes/index';
import { getMemberData } from '../actions/member';
import { getPersonalities, setError } from '../actions/personalities';

// Components
import Loading from './components/Loading';

// Load css
require('./styles/style.scss');

const { persistor, store } = configureStore();
// persistor.purge(); // Debug to clear persist

const rootElement = document.getElementById('root');

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <Router>
        <Routes />
      </Router>
    </PersistGate>
  </Provider>
);

render(<Root />, rootElement);
registerServiceWorker();

/**
  * Fetch Data from API, saving to Redux
  */
store.dispatch(getMemberData());
store.dispatch(getPersonalities())
  .catch((err) => {
    console.log(`Error: ${err}`);
    return setError(err);
  });
