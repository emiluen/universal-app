import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import MemberContainer from './Member';
import memberStatus from '../selectors/member-status';

class Profile extends Component {
  static propTypes = {
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
  }

  componentDidMount = () => console.log('component mount');

  render = () => {
    const { Layout, member, userPersonalities } = this.props;

    return (
      <MemberContainer Layout={props => (
        <Layout
          {...props}
          member={member}
          loading={member.loading || userPersonalities.loading}
          error={member.error || userPersonalities.error}
          userPersonalities={userPersonalities.personalities}
        />
        )}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const memberStatusPersonalities = memberStatus(state.personalities, state.member, true);
  const userPersonalities = memberStatusPersonalities.personalities
    .map((personality) => {
      // Keep all properties except 'types'
      const { types, ...personalityProps } = personality;

      return {
        ...personalityProps,
        type: _.first(personality.types),
      };
    });

  return {
    member: state.member || {},
    userPersonalities: { ...state.personalities, personalities: userPersonalities },
  };
};

export default connect(mapStateToProps)(Profile);
