import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { s } from 'react-native-wind';

const MultiSelectionButtons = ({ options, correctAnswers }) => {
  const [selectedButtons, setSelectedButtons] = useState(new Set());
  const [submitted, setSubmitted] = useState(false);

  const handleButtonPress = (option) => {
    if (submitted) return;
    const newSelectedButtons = new Set(selectedButtons);
    newSelectedButtons.has(option) ? newSelectedButtons.delete(option) : newSelectedButtons.add(option);
    setSelectedButtons(newSelectedButtons);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getButtonStyle = (option) => {
    const isButtonSelected = selectedButtons.has(option);
    const isCorrect = correctAnswers.includes(option);
    if (submitted) {
      return isCorrect
        ? s`border-green-500 bg-green-200`
        : s`border-red-500 bg-red-200`;
    }
    return isButtonSelected
      ? s`border-blue-500 bg-gray-200`
      : s`border-black-300 bg-transparent`;
  };

  return (
    <View style={s`flex flex-col items-center mb-4`}>
      <View style={s`flex-row flex-wrap justify-center items-center`}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[s`p-3 m-2 w-60 items-center justify-center rounded-lg border`, getButtonStyle(option)]}
            onPress={() => handleButtonPress(option)}>
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={[s`bg-blue-400 w-40 items-center justify-center border-black-500 p-3 rounded-lg m-2`, submitted && s`bg-blue-400`]}
        onPress={handleSubmit}
        disabled={submitted}>
        <Text style={s`text-black-500 text-white`}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MultiSelectionButtons;






