import React from 'react';
import { View, Text, StatusBar, Platform } from 'react-native';

const SetStatusbar = () => {
  return (
    <View>
      {/* Status Bar */}
      <StatusBar
        backgroundColor="#2c3e50"
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'}
        translucent={Platform.OS === 'android' ? true : false}
      />
    </View>
  );
};

export default SetStatusbar;
