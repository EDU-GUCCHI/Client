import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {s} from 'react-native-wind';
import Picker from '@react-native-picker/picker';

const MultiSelectionDropdown = ({options, correctAnswers, onChange}) => {
  const [selectedValue, setSelectedValue] = useState(options[0] || '');

  return (
    <View style={s`flex flex-col items-center`}>
      <Picker
        selectedValue={selectedValue}
        style={{height: 50, width: 150}}
        onValueChange={itemValue => {
          setSelectedValue(itemValue);
          onChange(itemValue);
        }}>
        {options.map((option, index) => (
          <Picker.Item key={index} label={option} value={option} />
        ))}
      </Picker>
    </View>
  );
};

export default MultiSelectionDropdown;
