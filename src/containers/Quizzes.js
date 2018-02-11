import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import memberStatus from '../selectors/member-status';

class Quizzes extends React.Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    personalities: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      personalities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
  }

  componentDidMount = () => console.log('quizzes container mounted');

  render = () => {
    const {
      Layout, personalities,
    } = this.props;

    return (
      <Layout
        error={personalities.error}
        loading={personalities.loading}
        personalities={personalities.personalities}
      />
    );
  }
}

const mapStateToProps = state => ({
  // personalities: state.personalities || {},
  personalities: state.personalities ? memberStatus(state.personalities, state.member) : {},
});

export default connect(mapStateToProps)(Quizzes);
