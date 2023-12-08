import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { s } from 'react-native-wind';

const SingleSelectionButtons = () => {
  const [selectedButton, setSelectedButton] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const buttonOptions = [
    'Ge mer insulin',
    'Läsk eller druvsocker',
    'Ät mer mat',
  ];

  // Correct options
  const correctOptions = new Set(['Button 1', 'Button 2']);

  const handleButtonPress = (option: any) => {
    if (submitted) return; // Disable button presses after submission
    setSelectedButton(option);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getButtonStyle = (option: any) => {
    if (submitted) {
      return correctOptions.has(option)
        ? s`bg-green-400 border-green-500 text-white`
        : s`bg-red-400 border-red-500 text-white`;
    }
    return selectedButton === option
      ? s`bg-gray-200 border-gray-400`
      : s`bg-warmGray-100 border-gray-300`;
  };

  return (
    <View style={s`flex flex-col items-center`}>
      <View style={s`flex-row flex-wrap justify-center items-center`}>
        {buttonOptions.map(option => (
          <TouchableOpacity
            key={option}
            style={[
              s`p-2 m-2 w-1/4 items-center justify-center rounded-lg`,
              getButtonStyle(option),
            ]}
            onPress={() => handleButtonPress(option)}>
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={s`bg-blue-500 p-3 rounded-lg m-2`}
        onPress={handleSubmit}
        disabled={submitted}>
        <Text style={s`text-white`}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SingleSelectionButtons;
