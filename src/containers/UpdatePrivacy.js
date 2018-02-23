import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SettingsContainer from './Settings';
import { updatePrivacy } from '../actions/member';
import getUserPersonalities from '../selectors/get-user-personalities';

const UpdatePrivacy = ({
  Layout,
  onFormSubmit,
  personalities,
}) => (
  <SettingsContainer Layout={props => (
    <Layout
      {...props}
      onFormSubmit={onFormSubmit}
      personalities={personalities}
    />
    )}
  />
);

UpdatePrivacy.propTypes = {
  Layout: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  personalities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  personalities: getUserPersonalities(state.personalities, state.member),
});

const mapDispatchToProps = {
  onFormSubmit: updatePrivacy,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePrivacy);
