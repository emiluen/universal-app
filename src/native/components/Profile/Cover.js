import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { View, Content, Thumbnail, Icon } from 'native-base';

const Cover = ({ onSettings }) => (
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
      <Thumbnail large source={{ uri: 'http://primo.ws/files/Disks/Avatars/Avatar_girl_face3.png' }} />
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
  onSettings: PropTypes.func,
};

Cover.defaultProps = {
  onSettings: null,
};

export default Cover;
