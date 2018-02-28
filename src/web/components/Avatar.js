import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ imageUrl, small, className }) => {
  const placeholder = 'https://www.synbio.cam.ac.uk/images/avatar-generic.jpg/image';

  return (
    <img
      src={imageUrl || placeholder}
      className={`avatar ${small ? 'avatar__small' : 'avatar__large'} ${className}`}
      alt="Profile"
    />
  );
};

Avatar.propTypes = {
  imageUrl: PropTypes.string,
  small: PropTypes.bool,
  className: PropTypes.string,
};

Avatar.defaultProps = {
  imageUrl: null,
  small: false,
  className: '',
};

export default Avatar;
