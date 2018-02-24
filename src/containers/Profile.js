import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MemberContainer from './Member';
import getUserPersonalities from '../selectors/get-user-personalities';
import baseUrl from '../constants/baseUrl';

const Profile = ({ Layout, member, userPersonalities }) => {
  const shareProfileUrl = `${baseUrl}profile/${member.uid}`;

  return (
    <MemberContainer Layout={props => (
      <Layout
        {...props}
        member={member}
        loading={member.loading || userPersonalities.loading}
        error={member.error || userPersonalities.error}
        userPersonalities={userPersonalities.personalities}
        shareProfileUrl={shareProfileUrl}
      />
      )}
    />
  );
};

Profile.propTypes = {
  Layout: PropTypes.func.isRequired,
  member: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }).isRequired,
  userPersonalities: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    personalities: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => {
  const userPersonalities = getUserPersonalities(state.personalities, state.member);

  return {
    member: state.member || {},
    userPersonalities: { ...state.personalities, personalities: userPersonalities },
  };
};

export default connect(mapStateToProps)(Profile);
