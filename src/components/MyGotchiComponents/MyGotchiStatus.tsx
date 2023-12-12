import React from 'react';
import { TextInput, View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { s } from 'react-native-wind';

type MyGotchiStatusProps = {
  statusText: string;
  statusIcon: string;
  style: ViewStyle;
};

import { ViewStyle } from 'react-native';

const MyGotchiStatus = ({
  statusText,
  statusIcon,
  style,
}: MyGotchiStatusProps) => (
  <View style={[style as ViewStyle]}>
    <Text style={s`text-black text-3xl`}>{statusText}</Text>
    <Text style={s`text-black pt-4 text-4xl text-center`}>{statusIcon}</Text>
  </View>
);

export default MyGotchiStatus;
