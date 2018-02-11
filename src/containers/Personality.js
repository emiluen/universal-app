import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import addMemberStatus from '../selectors/add-member-status';

class Personality extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    personalities: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      personalities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
  };

  static defaultProps = {
    match: null,
  };

  componentDidMount = () => console.log('personalities component mounted');

  render = () => {
    const {
      Layout, personalities, match,
    } = this.props;

    const personalityId = (match && match.params && match.params.personalityId) ?
      match.params.personalityId : null;

    // Get this Personality from all personalities
    let personality = null;
    if (personalityId && personalities.personalities) {
      personality = personalities.personalities.find(item => item.id === personalityId);
    }

    return (
      <Layout
        loading={personalities.loading}
        error={personalities.error}
        personality={personality}
      />
    );
  }
}

const mapStateToProps = state => ({
  // personalities: state.personalities || {},
  personalities: state.personalities ? addMemberStatus(state.personalities, state.member) : {},
});

export default connect(mapStateToProps)(Personality);
