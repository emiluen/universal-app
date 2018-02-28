import React from 'react';
import PropTypes from 'prop-types';
import { Thumbnail } from 'native-base';

const Avatar = ({ imageUrl }) => {
  const placeholder = 'https://www.synbio.cam.ac.uk/images/avatar-generic.jpg/image';

  return (
    <Thumbnail large source={{ uri: imageUrl || placeholder }} />
  );
};

Avatar.propTypes = {
  imageUrl: PropTypes.string,
};

Avatar.defaultProps = {
  imageUrl: null,
};

export default Avatar;
