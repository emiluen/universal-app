import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from '../actions/member';

class Member extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    memberLogout: PropTypes.func.isRequired,
    member: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }).isRequired,
  }

  componentDidMount = () => console.log('component mount'); // this.props.getMemberData();

  render = () => {
    const { Layout, member, memberLogout } = this.props;

    const loggedIn = !!(member && member.email);

    return <Layout member={member} logout={memberLogout} loggedIn={loggedIn} />;
  }
}

const mapStateToProps = state => ({
  member: state.member || {},
});

const mapDispatchToProps = {
  memberLogout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Member);
