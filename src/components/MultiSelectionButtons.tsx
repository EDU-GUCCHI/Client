import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { s } from 'react-native-wind';

const MultiSelectionButtons = () => {
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const [buttonOptions, setButtonOptions] = useState<string[]>([]);

  useEffect(() => {
    // Fetch button names from the backend here and set them using setButtonOptions
    // For example, you can use fetch or an API call to get the names.
    const fetchedButtonNames = ['Button 1', 'Button 2', 'Button 3', 'Button 4', 'Button 5', 'Button 6'];
    setButtonOptions(fetchedButtonNames);
  }, []);

  const handleButtonPress = (option: string) => {
    if (selectedButtons.includes(option)) {
      setSelectedButtons(selectedButtons.filter((item) => item !== option));
    } else {
      setSelectedButtons([...selectedButtons, option]);
    }
  };

  return (
    <View>
      <View style={s`flex-row flex-wrap justify-center items-center`}>
        {buttonOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              s`p-2 border border-gray-300 m-2`,
              selectedButtons.includes(option) && s`bg-blue-500 border-blue-500 text-white`,
              s`w-1/4 items-center justify-center rounded-lg`, // This will ensure at least three buttons on the same line
            ]}
            onPress={() => handleButtonPress(option)}
          >
            <Text>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default MultiSelectionButtons;
