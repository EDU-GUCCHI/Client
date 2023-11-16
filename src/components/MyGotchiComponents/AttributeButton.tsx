import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {s} from 'react-native-wind';

type AttributeButtonProps = {
  text: string;
  onPress: () => void;
  colors: string[];
  locations?: number[];
  useAngle?: boolean;
  angle?: number;
  angleCenter?: {x: number; y: number};
};

import { ViewStyle } from 'react-native';

const AttributeButton = ({
  onPress,
  text,
  colors,
  locations,
  useAngle,
  angle,
  angleCenter,
}: AttributeButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={s`w-flex h-6 mt-3 flex items-center justify-center mt-3 rounded-md`}>
    <LinearGradient
      colors={colors}
      locations={locations}
      useAngle={useAngle}
      angle={angle}
      angleCenter={angleCenter}
      style={s`w-full h-full rounded-md items-center justify-center`}>
      <Text style={s`text-white text-md font-bold`}>{text}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

export default AttributeButton;