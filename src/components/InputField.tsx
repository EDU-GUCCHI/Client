import React from 'react';
import {TextInput, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {s} from 'react-native-wind';

type InputFieldProps = {
  placeholder: string;
  value: string;
  colors: string[]; // Array of colors for the gradient
  locations?: number[]; // Optional locations for the gradient colors
  useAngle?: boolean; // Optional boolean to use angle or not
  angle?: number; // Optional angle for the gradient direction
  angleCenter?: {x: number; y: number}; // Optional center for the gradient angle

  onChangeText: (text: string) => void;
};

const InputField = ({placeholder, value, onChangeText}: InputFieldProps) => (
  <TextInput
    style={s`w-80 h-14 px-3 mb-5 bg-gray-100 rounded-3xl border`}
    placeholderTextColor="#000000"
    placeholder={placeholder}
    onChangeText={onChangeText}
    value={value}
  />
);

export default InputField;
