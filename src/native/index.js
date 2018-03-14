import React from 'react';
import { StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Stack } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { FlagsProvider } from 'flag';

import { StyleProvider } from 'native-base';
import getTheme from '../../native-base-theme/components';
import theme from '../../native-base-theme/variables/commonColor';
import flags from '../constants/featureFlags';

import Routes from './routes/index';
// import Loading from './components/Loading';
import Splash from './components/Splash/Splash';
import { getMemberData } from '../actions/member';
import { getPersonalities, setError } from '../actions/personalities';

// Hide StatusBar on Android as it overlaps tabs
if (Platform.OS === 'android') StatusBar.setHidden(true);

const Root = ({ store, persistor }) => {
  /**
    * Fetch Data from API, saving to Redux
    */
  store.dispatch(getMemberData());
  store.dispatch(getPersonalities())
    .catch((err) => {
      console.log(`Error: ${err}`);
      return setError(err);
    });

  return (
    <Provider store={store}>
      <PersistGate
        loading={<Splash />}
        persistor={persistor}
      >
        <StyleProvider style={getTheme(theme)}>
          <FlagsProvider flags={flags}>
            <Router>
              <Stack key="root">
                {Routes}
              </Stack>
            </Router>
          </FlagsProvider>
        </StyleProvider>
      </PersistGate>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.shape({}).isRequired,
  persistor: PropTypes.shape({}).isRequired,
};

export default Root;
