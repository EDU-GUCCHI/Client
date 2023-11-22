import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {s} from 'react-native-wind';
import { useScenarioController } from './ScenarioControllerContext';

const MultiSelectionButtons = ({options, correctAnswers}) => {
  const [selectedButtons, setSelectedButtons] = useState(new Set());
  const [submitted, setSubmitted] = useState(false);

  const handleButtonPress = option => {
    if (submitted) return;
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
      if (correctAnswers.includes(option)) {
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
        {options.map((option, index) => {
          if (submitted && !selectedButtons.has(option)) return null;
          return (
            <TouchableOpacity
              key={index}
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
        disabled={submitted}>
        <Text style={s`text-white`}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
export default MultiSelectionButtons;