import React from 'react';
import { Platform, Share, TouchableOpacity } from 'react-native';
import { View, Content, Icon } from 'native-base';

const onShare = () => {
  const url = 'https://aftonbladet.se';
  const title = 'This is a title';
  const message = 'This is a message';
  const displayMessage = Platform.OS === 'ios' ? message : `${message} ${url}`;

  Share.share({
    title,
    message: displayMessage,

    // iOS
    url,
    subject: title,

    // Android
    dialogTitle: title,
  });
};

const ShareFab = () => (
  <View style={{
    position: 'absolute',
    bottom: 0,
    right: 0,
  }}
  >
    <Content padder>
      <View style={{
        backgroundColor: '#473BE7', // brand color
        justifyContent: 'center',
        alignItems: 'center',
        width: 56,
        height: 56,
        borderRadius: 28,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
      }}
      >
        <TouchableOpacity onPress={onShare} >
          <Icon ios="ios-share" android="md-share" style={{ fontSize: 30, color: 'white' }} />
        </TouchableOpacity>
      </View>
    </Content>
  </View>
);

export default ShareFab;
