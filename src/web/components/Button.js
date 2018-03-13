import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => {
  const {
    children,
    button,
    link,
    outline,
    color,
    className,
  } = props;

  const resetProps = {
    button: 0,
    link: 0,
    outline: 0,
  };

  let styleClasses = className ? `${className} ` : '';

  if (color === 'primary') {
    // Link with primary style
    styleClasses += `${button ? (outline ? 'button btn btn-outline-primary' : 'button btn btn-primary') : ''}${link ? 'text-primary' : ''}`;
  } else if (color === 'secondary') {
    // Link with secondary style
    styleClasses += `${button ? (outline ? 'button btn btn-outline-secondary' : 'button btn btn-secondary') : ''}${link ? 'text-secondary' : ''}`;
  }

  // Button
  return (
    <button
      {...props}
      {...resetProps}
      className={styleClasses}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  button: PropTypes.bool,
  link: PropTypes.bool,
  outline: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'secondary']),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  button: false,
  link: false,
  outline: false,
  color: 'primary',
  className: '',
};

export default Button;
