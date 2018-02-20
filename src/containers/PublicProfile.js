import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPublicProfile, setError } from '../actions/publicProfile';
import getUserPersonalities from '../selectors/get-user-personalities';

class PublicProfile extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
    getPublicProfile: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    personalities: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }

  static defaultProps = {
    match: null,
    error: null,
  }

  componentDidMount = () => {
    const UID = (
      this.props.match && this.props.match.params && this.props.match.params.id) ?
      this.props.match.params.id : null;

    this.fetchPublicProfile(UID);
  };

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchPublicProfile = (UID) => {
    this.props.getPublicProfile(UID)
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  };

  render = () => {
    const {
      Layout, loading, error, match, firstName, personalities,
    } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        recipeId={id}
        error={error}
        loading={loading}
        firstName={firstName}
        personalities={personalities}
      />
    );
  }
}

const mapStateToProps = state => ({
  loading: state.publicProfile.loading,
  error: state.publicProfile.error,
  firstName: state.publicProfile.firstName,
  personalities: getUserPersonalities(state.personalities, state.publicProfile),
});

const mapDispatchToProps = {
  getPublicProfile,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicProfile);
