import React from 'react';
import PropTypes from 'prop-types';
import { Platform, Share, TouchableOpacity } from 'react-native';
import { View, Content, Icon } from 'native-base';

const ShareFab = ({ shareObject }) => {
  const onShare = () => {
    Share.share({
      title: shareObject.title,
      message: Platform.OS === 'ios' ? shareObject.message : shareObject.messageUrl,

      // iOS
      url: shareObject.url,
      subject: shareObject.title,

      // Android
      dialogTitle: shareObject.title,
    });
  };

  return (
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
};

ShareFab.propTypes = {
  shareObject: PropTypes.shape({
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    messageUrl: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    hashtags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ShareFab;
