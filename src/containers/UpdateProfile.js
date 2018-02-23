import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SettingsContainer from './Settings';
import { updateProfile } from '../actions/member';

const UpdateProfile = ({
  Layout,
  onFormSubmit,
}) => (
  <SettingsContainer Layout={props => (
    <Layout
      {...props}
      onFormSubmit={onFormSubmit}
    />
  )}
  />
);

UpdateProfile.propTypes = {
  Layout: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onFormSubmit: updateProfile,
};

export default connect(null, mapDispatchToProps)(UpdateProfile);
