import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'native-base';
import Loading from '../Loading';
import Messages from '../Messages';

import UpdateProfileContainer from '../../../containers/UpdateProfile';
import UpdatePrivacyContainer from '../../../containers/UpdatePrivacy';

import UpdateProfileComponent from './UpdateProfile';
import UpdatePrivacyComponent from './UpdatePrivacy';

const Settings = ({ loading, error, success }) => {
  // Loading
  if (loading) return <Loading />;

  return (
    <Tabs transparent initialPage={0}>
      <Tab heading="Settings">
        {error && <Messages message={error} />}
        {success && <Messages message={success} type="success" />}
        <UpdateProfileContainer Layout={UpdateProfileComponent} />
      </Tab>
      <Tab heading="Privacy">
        {error && <Messages message={error} />}
        {success && <Messages message={success} type="success" />}
        <UpdatePrivacyContainer Layout={UpdatePrivacyComponent} />
      </Tab>
    </Tabs>
  );
};

Settings.propTypes = {
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  success: PropTypes.string,
};

Settings.defaultProps = {
  error: null,
  success: null,
};

export default Settings;
