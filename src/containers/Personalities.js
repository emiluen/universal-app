import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPersonalities, setError } from '../actions/personalities';
import memberStatus from '../selectors/member-status';

class Personalities extends React.Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    getPersonalities: PropTypes.func.isRequired,
    personalities: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      personalities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    }).isRequired,
    setError: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
  }

  static defaultProps = {
    match: null,
  }

  componentDidMount = () => this.fetchPersonalities();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchPersonalities = () => {
    this.props.getPersonalities()
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  };

  render = () => {
    const {
      Layout, personalities, match,
    } = this.props;

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
        reFetch={() => this.fetchPersonalities()}
      />
    );
  }
}

const mapStateToProps = state => ({
  personalities: state.personalities ? memberStatus(state.personalities, state.member) : {},
});

const mapDispatchToProps = {
  getPersonalities,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Personalities);
