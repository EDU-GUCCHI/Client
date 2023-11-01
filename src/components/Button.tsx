import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {s} from 'react-native-wind';

type ButtonProps = {
  text: string;
  onPress: () => void;
};

const Button = ({onPress, text}: ButtonProps) => (
  <TouchableOpacity
    style={s`w-72 h-12 mt-3 rounded-md items-center justify-center bg-violet-900`}
    onPress={onPress}>
    <Text style={s`text-white text-md font-bold`}>{text}</Text>
  </TouchableOpacity>
);

export default Button;
