import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {s} from 'react-native-wind';
import { useScenarioController } from './ScenarioControllerContext';

const MultiSelectionButtons = () => {
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const [buttonOptions, setButtonOptions] = useState<string[]>([]);
  const controller = useScenarioController();
  const guiController = controller.GUIController;

  useEffect(() => {
    // Fetch button names from the backend here and set them using setButtonOptions
    // For example, you can use fetch or an API call to get the names.
    const fetchedButtonNames = [
      'Button 1',
      'Button 2',
      'Button 3',
      'Button 4',
      'Button 5',
      'Button 6',
    ];
    setButtonOptions(fetchedButtonNames);
  }, []);

  const handleButtonPress = (option: string) => {
    if (selectedButtons.includes(option)) {
      setSelectedButtons(selectedButtons.filter(item => item !== option));
    } else {
      setSelectedButtons([...selectedButtons, option]);
    }

    // send button to GUI controller, check if right or wrong, send callback which changes color on button.
    // store result of clicked button.
    guiController.handleButtonAnswer(option); // TODO: implement this.
  };

  return (
    <View style={s`flex-row flex-wrap justify-center items-center`}>
      {buttonOptions.map(option => (
        <TouchableOpacity
          key={option}
          style={[
            s`p-2 border border-gray-300 bg-warmGray-100 m-2`,
            selectedButtons.includes(option) &&
              s`bg-blue-400 border-blue-500 text-white`,
            s`w-1/4 items-center justify-center rounded-lg`, // This will ensure at least three buttons on the same line
          ]}
          onPress={() => handleButtonPress(option)}>
          <Text>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default MultiSelectionButtons;