import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import addMemberStatus from '../selectors/add-member-status';

const Personalities = ({
  Layout,
  personalities,
  match,
}) => {
  const personalityId = (match && match.params && match.params.personalityId) ?
    match.params.personalityId : null;
  const typeId = (match && match.params && match.params.typeId) ? match.params.typeId : null;

  return (
    <Layout
      personalityId={personalityId}
      typeId={typeId}
      error={personalities.error}
      loading={personalities.loading}
      personalities={personalities.personalities}
    />
  );
};

Personalities.propTypes = {
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

Personalities.defaultProps = {
  match: null,
};

const mapStateToProps = state => ({
  // personalities: state.personalities || {},
  personalities: state.personalities ? addMemberStatus(state.personalities, state.member) : {},
});

export default connect(mapStateToProps)(Personalities);
