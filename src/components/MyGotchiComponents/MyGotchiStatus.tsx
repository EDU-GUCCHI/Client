import React from 'react';
import { View, Text } from 'react-native';
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
