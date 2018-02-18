import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SettingsContainer from './Settings';
import { updatePrivacy } from '../actions/member';
import getUserPersonalities from '../selectors/get-user-personalities';

const UpdatePrivacy = ({
  Layout,
  onFormSubmit,
  member,
  personalities,
}) => (
  <SettingsContainer Layout={props => (
    <Layout
      {...props}
      member={member}
      onFormSubmit={onFormSubmit}
      personalities={personalities}
    />
    )}
  />
);

UpdatePrivacy.propTypes = {
  Layout: PropTypes.func.isRequired,
  member: PropTypes.shape({}).isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  personalities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  member: state.member || {},
  personalities: getUserPersonalities(state.personalities, state.member),
});

const mapDispatchToProps = {
  onFormSubmit: updatePrivacy,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePrivacy);
