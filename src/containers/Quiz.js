import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import addMemberStatus from '../selectors/add-member-status';

const Quiz = ({
  Layout,
  match,
  personalities,
}) => {
  const personalityId = (match && match.params && match.params.personalityId) ?
    match.params.personalityId : null;

  // Get this Type from all personality types
  let personality = null;
  if (personalityId && personalities.personalities) {
    personality = personalities.personalities.find(item => item.id === personalityId);
  }

  return (
    <Layout
      // error={quiz.error}
      // loading={quiz.loading}
      // quiz={quiz.quiz}
      error={personalities.error}
      loading={personalities.loading}
      quiz={personality ? personality.quiz : null}
      personality={personality}
    />
  );
};

Quiz.propTypes = {
  Layout: PropTypes.func.isRequired,
  personalities: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    personalities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({}),
  }),
  // quiz: PropTypes.shape({
  //  loading: PropTypes.bool.isRequired,
  //  error: PropTypes.string,
  //  quiz: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  // }).isRequired,
  // quiz: PropTypes.shape({}).isRequired,
};

Quiz.defaultProps = {
  match: null,
};

const mapStateToProps = state => ({
  personalities: state.personalities ? addMemberStatus(state.personalities, state.member) : {},
});

export default connect(mapStateToProps)(Quiz);
