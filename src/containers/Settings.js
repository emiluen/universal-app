import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Settings = ({
  Layout,
  isLoading,
  errorMessage,
  successMessage,
}) => (
  <Layout
    loading={isLoading}
    error={errorMessage}
    success={successMessage}
  />
);

Settings.propTypes = {
  Layout: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
};

Settings.defaultProps = {
  errorMessage: null,
  successMessage: null,
};

const mapStateToProps = state => ({
  isLoading: state.status.loading || false,
  errorMessage: state.status.error || null,
  successMessage: state.status.success || null,
});

export default connect(mapStateToProps)(Settings);
