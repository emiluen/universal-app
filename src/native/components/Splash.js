import React from 'react';
import { View, Text } from 'react-native';
import Colors from '../../../native-base-theme/variables/commonColor';

const Splash = () => (
  <View style={{
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.brandPrimary,
    }}
  >
    <Text style={{ color: 'white' }}>Loading...</Text>
  </View>
);

export default Splash;
