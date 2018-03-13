import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

import Link from '../Link';

const EmptyState = ({ logInOption }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2>Start your Personality Profile</h2>
    <p>Learn more about yourself. Share your results with friends and family.</p>
    <Row>
      <Link button color="primary" to="/personalities">Take Test</Link>
    </Row>

    {logInOption && (
      <Row style={{ marginTop: 50 }}>
        <span>Already have an account?</span>&nbsp;<Link link color="primary" to="/login">Login here</Link>.
      </Row>
    )}
  </div>
);

EmptyState.propTypes = {
  logInOption: PropTypes.bool,
};

EmptyState.defaultProps = {
  logInOption: false,
};

export default EmptyState;
