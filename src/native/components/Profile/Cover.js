import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { View, Content, Thumbnail, Icon } from 'native-base';

const placeholderImage = 'http://primo.ws/files/Disks/Avatars/Avatar_girl_face3.png';

const Cover = ({ image, onSettings, onImageClick }) => {
  const imageUrl = image || placeholderImage;

  return (
    <View
      primary
      style={{
      flex: 1,
      backgroundColor: '#473BE7',
      height: 150,
      }}
    >
      <Content
        padder
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {onImageClick ?
          <TouchableOpacity onPress={onImageClick}>
            <Thumbnail large source={{ uri: imageUrl }} />
          </TouchableOpacity>
          :
          <Thumbnail large source={{ uri: imageUrl }} />
        }

        {onSettings && (
          <TouchableOpacity
            onPress={onSettings}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            <Icon ios="ios-settings" android="md-settings" style={{ fontSize: 30, color: 'white' }} />
          </TouchableOpacity>
        )}
      </Content>
    </View>
  );
};

Cover.propTypes = {
  image: PropTypes.string,
  onSettings: PropTypes.func,
  onImageClick: PropTypes.func,
};

Cover.defaultProps = {
  image: null,
  onSettings: null,
  onImageClick: null,
};

export default Cover;
