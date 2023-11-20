import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {s} from 'react-native-wind';

const MultiSelectionButtons = () => {
  const [selectedButtons, setSelectedButtons] = useState(new Set());
  const [submitted, setSubmitted] = useState(false);
  const buttonOptions = [
    'Button 1',
    'Button 2',
    'Button 3',
    'Button 4',
    'Button 5',
    'Button 6',
  ];

  const handleButtonPress = option => {
    if (submitted) return; // Disable button presses after submission
    const newSelectedButtons = new Set(selectedButtons);
    if (newSelectedButtons.has(option)) {
      newSelectedButtons.delete(option);
    } else {
      newSelectedButtons.add(option);
    }
    setSelectedButtons(newSelectedButtons);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getButtonStyle = option => {
    if (submitted) {
      if (option === 'Button 1' || option === 'Button 4') {
        return s`bg-green-400 border-green-500 text-white`;
      }
      return s`bg-red-400 border-red-500 text-white`;
    }
    return selectedButtons.has(option)
      ? s`bg-gray-200 border-gray-400`
      : s`bg-warmGray-100 border-gray-300`;
  };

  return (
    <View style={s`flex flex-col items-center`}>
      <View style={s`flex-row flex-wrap justify-center items-center`}>
        {buttonOptions.map(option => {
          if (submitted && !selectedButtons.has(option)) return null; // Hide non-selected buttons after submission
          return (
            <TouchableOpacity
              key={option}
              style={[
                s`p-2 m-2 w-1/4 items-center justify-center rounded-lg`,
                getButtonStyle(option),
              ]}
              onPress={() => handleButtonPress(option)}>
              <Text>{option}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity
        style={s`bg-blue-500 p-3 rounded-lg m-2`}
        onPress={handleSubmit}
        disabled={submitted} // Disable submit button after submission
      >
        <Text style={s`text-white`}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MultiSelectionButtons;
