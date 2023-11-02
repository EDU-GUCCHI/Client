import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {s} from 'react-native-wind';

type LgButtonProps = {
  text: string;
  onPress: () => void;
};

const LgButton = ({onPress, text}: LgButtonProps) => (
  <TouchableOpacity
    style={s`w-72 h-12 mt-3 rounded-md items-center justify-center bg-violet-900`}
    onPress={onPress}>
    <Text style={s`text-white text-md font-bold`}>{text}</Text>
  </TouchableOpacity>
);

export default LgButton;
