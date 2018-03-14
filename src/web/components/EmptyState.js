import React from 'react';
import PropTypes from 'prop-types';

const EmptyState = ({ title, message, button, footer }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <h2>{title}</h2>
    <p>{message}</p>
    {button}
    <div style={{ marginTop: 50 }}>
      {footer}
    </div>
  </div>
);

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  button: PropTypes.node,
  footer: PropTypes.node,
};

EmptyState.defaultProps = {
  message: null,
  button: null,
  footer: null,
}

export default EmptyState;
