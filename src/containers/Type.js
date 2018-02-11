import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import addMemberStatus from '../selectors/add-member-status';
import { addPersonality, removePersonality } from '../actions/member';

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
    member: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }).isRequired,
    addUserPersonality: PropTypes.func.isRequired,
    removeUserPersonality: PropTypes.func.isRequired,
  };

  static defaultProps = {
    match: null,
  };

  componentDidMount = () => console.log('personalities component mounted');

  render = () => {
    const {
      Layout, personalities, match, addUserPersonality, removeUserPersonality, member,
    } = this.props;

    const loggedIn = !!(member && member.email);

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
        canAddPersonality={loggedIn && !type.typeMember}
        addPersonality={addUserPersonality}
        canRemovePersonality={loggedIn && type.typeMember}
        removePersonality={removeUserPersonality}
      />
    );
  }
}

const mapStateToProps = state => ({
  // personalities: state.personalities || {},
  member: state.member || {},
  personalities: state.personalities ? addMemberStatus(state.personalities, state.member) : {},
});

const mapDispatchToProps = {
  addUserPersonality: addPersonality,
  removeUserPersonality: removePersonality,
};

export default connect(mapStateToProps, mapDispatchToProps)(Type);
