import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { s } from 'react-native-wind';

type SmButtonProps = {
  text: string;
  onPress: () => void;
  colors: string[]; // Array of colors for the gradient
  locations?: number[]; // Optional locations for the gradient colors
  useAngle?: boolean; // Optional boolean to use angle or not
  angle?: number; // Optional angle for the gradient direction
  angleCenter?: { x: number; y: number }; // Optional center for the gradient angle
};

const SmButton = ({
  onPress,
  text,
  colors,
  locations,
  useAngle,
  angle,
  angleCenter,
}: SmButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={s`w-10 h-10 mt-3 rounded-md items-center justify-center`}>
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

export default SmButton;
