import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import memberStatus from '../selectors/member-status';

class Type extends Component {
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
    const typeId = (match && match.params && match.params.typeId) ? match.params.typeId : null;

    // Get this Type from all personality types
    let personality = null;
    let type = null;
    if (personalityId && typeId && personalities.personalities) {
      personality = personalities.personalities.find(item => item.id === personalityId);
    }

    if (typeId && personality) {
      type = personality.types.find(item => item.id === typeId);
    }

    return (
      <Layout
        loading={personalities.loading}
        error={personalities.error}
        personality={personality}
        type={type}
      />
    );
  }
}

const mapStateToProps = state => ({
  // personalities: state.personalities || {},
  personalities: state.personalities ? memberStatus(state.personalities, state.member) : {},
});

export default connect(mapStateToProps)(Type);
