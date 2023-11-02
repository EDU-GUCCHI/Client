import React from 'react';
import {TextInput, View} from 'react-native';
import {s} from 'react-native-wind';

type InputFieldProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
};

const InputField = ({placeholder, value, onChangeText}: InputFieldProps) => (
  <View
    style={s`bg-warmGray-300 border-2 border-warmGray-400 w-72 rounded-md mb-5`}>
    <TextInput
      style={s`flex px-4`}
      placeholder={placeholder}
      placeholderTextColor="#003f5c"
      onChangeText={onChangeText}
      value={value}
    />
  </View>
);

export default InputField;
