import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { View, Content, Icon } from 'native-base';

import Avatar from '../Avatar';

const Cover = ({ imageUrl, onSettings, onImageClick }) => (
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
          <Avatar imageUrl={imageUrl} />
        </TouchableOpacity>
        :
        <Avatar imageUrl={imageUrl} />
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

Cover.propTypes = {
  imageUrl: PropTypes.string,
  onSettings: PropTypes.func,
  onImageClick: PropTypes.func,
};

Cover.defaultProps = {
  imageUrl: null,
  onSettings: null,
  onImageClick: null,
};

export default Cover;
