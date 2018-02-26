import React from 'react';
import PropTypes from 'prop-types';

const ProfilePicture = ({ imageUrl }) => (
  <div className="profile-picture__container">
    <img src={imageUrl} className="profile-picture__img" alt="Profile" />
  </div>
);

ProfilePicture.propTypes = {
  imageUrl: PropTypes.string,
};

ProfilePicture.defaultProps = {
  imageUrl: null,
};

export default ProfilePicture;
