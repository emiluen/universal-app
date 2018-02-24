import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from '../actions/member';

const Member = ({ Layout, member, memberLogout }) => {
  const loggedIn = !!(member && member.email);

  return <Layout member={member} logout={memberLogout} loggedIn={loggedIn} />;
};

Member.propTypes = {
  Layout: PropTypes.func.isRequired,
  memberLogout: PropTypes.func.isRequired,
  member: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  member: state.member || {},
});

const mapDispatchToProps = {
  memberLogout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Member);
