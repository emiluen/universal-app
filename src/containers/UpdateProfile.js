import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SettingsContainer from './Settings';
import { updateProfile } from '../actions/member';

const UpdateProfile = ({
  Layout,
  onFormSubmit,
  member,
}) => (
  <SettingsContainer Layout={props => (
    <Layout
      {...props}
      member={member}
      onFormSubmit={onFormSubmit}
    />
    )}
  />
);

UpdateProfile.propTypes = {
  Layout: PropTypes.func.isRequired,
  member: PropTypes.shape({}).isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  member: state.member || {},
  isLoading: state.status.loading || false,
});

const mapDispatchToProps = {
  onFormSubmit: updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile);
