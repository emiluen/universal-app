import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

const Link = (props) => {
  const {
    children,
    button,
    link,
    outline,
    color,
    className,
    to,
  } = props;

  const resetProps = {
    button: 0,
    link: 0,
    outline: 0,
    primary: 0,
    secondary: 0,
  };

  let styleClasses = className ? `${className} ` : '';

  if (color === 'primary') {
    // Link with primary style
    styleClasses += `${button ? (outline ? 'button btn btn-outline-primary' : 'button btn btn-primary') : ''}${link ? 'text-primary' : ''}`;
  } else if (color === 'secondary') {
    // Link with secondary style
    styleClasses += `${button ? (outline ? 'button btn btn-outline-secondary' : 'button btn btn-secondary') : ''}${link ? 'text-secondary' : ''}`;
  }

  // Router link
  if (to) {
    return (
      <RouterLink
        {...props}
        {...resetProps}
        className={styleClasses}
      >
        {children}
      </RouterLink>
    );
  }

  // Regular a link
  return (
    <a
      {...props}
      {...resetProps}
      className={styleClasses}
    >
      {children}
    </a>
  );
};

Link.propTypes = {
  button: PropTypes.bool,
  link: PropTypes.bool,
  outline: PropTypes.bool,
  color: PropTypes.oneOf(['primary', 'secondary']),
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  className: PropTypes.string,
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Link.defaultProps = {
  button: false,
  link: false,
  outline: false,
  color: null,
  primary: false,
  secondary: false,
  className: '',
  to: null,
};

export default Link;
