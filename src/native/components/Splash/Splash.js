import React from 'react';
import { View, Image } from 'react-native';
import Colors from '../../../../native-base-theme/variables/commonColor';

const Splash = () => (
  <View style={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.brandPrimary,
    }}
  >
    <Image
      style={{
        flex: 1,
        width: '40%',
        height: null,
        resizeMode: 'contain',
      }}
      source={require('./splash.png')}
    />
  </View>
);

export default Splash;
