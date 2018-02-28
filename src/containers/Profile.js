import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MemberContainer from './Member';
import getUserPersonalities from '../selectors/get-user-personalities';
import getShareProfile from '../selectors/get-share-profile';
import { uploadImageFromBlob } from '../actions/member';

const Profile = ({
  Layout,
  member,
  userPersonalities,
  shareProfile,
}) => (
  <MemberContainer Layout={props => (
    <Layout
      {...props}
      member={member}
      loading={member.loading || userPersonalities.loading}
      error={member.error || userPersonalities.error}
      userPersonalities={userPersonalities.personalities}
      shareProfile={shareProfile}
      uploadImageFromBlob={uploadImageFromBlob}
    />
    )}
  />
);

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
  shareProfile: PropTypes.shape({}),
};

Profile.defaultProps = {
  shareProfile: null,
};

const mapStateToProps = (state) => {
  const userPersonalities = getUserPersonalities(state.personalities, state.member);

  return {
    member: state.member || {},
    userPersonalities: { ...state.personalities, personalities: userPersonalities },
    shareProfile: getShareProfile(state.member),
  };
};

export default connect(mapStateToProps)(Profile);
