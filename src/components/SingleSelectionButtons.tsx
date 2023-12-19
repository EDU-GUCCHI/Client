import {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {s} from 'react-native-wind';

const SingleSelectionButtons = ({
  options,
  correctAnswers,
  onAnswerEvaluation = () => {},
  submitted,
  onSelection, // Receive the onSelection prop
}) => {
  const [selectedButton, setSelectedButton] = useState(null); // Changed to null for single selection
  const [answersEvaluation, setAnswersEvaluation] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    // Initialize answersEvaluation with all options
    const initialEvaluation = {};
    options.forEach(option => {
      initialEvaluation[option] = {
        selected: false,
        correct: false,
      };
    });
    setAnswersEvaluation(initialEvaluation);
  }, [options]);

  useEffect(() => {
    if (submitted) {
      const evaluation = {...answersEvaluation};
      options.forEach(option => {
        evaluation[option] = {
          selected: option === selectedButton,
          correct: correctAnswers.includes(option),
        };
      });
      setAnswersEvaluation(evaluation);
      onAnswerEvaluation(); // Callback to inform parent about the evaluation
    }
  }, [submitted, options, correctAnswers, selectedButton]);

  useEffect(() => {
    if (submitted) {
      onSelection(selectedIndex); // Call onSelection with the current indices
    }
  }, [submitted]); // Depend only on submitted

  const handleButtonPress = (option, index) => {
    if (submitted) return; // Prevent interaction after submission
    setSelectedButton(option);
    setSelectedIndex(index); // Ensure this state is being updated
    console.log('Selected button index: ', index);
  };

  const getButtonStyle = option => {
    const result = answersEvaluation[option];
    if (submitted && result) {
      if (result.selected) {
        return result.correct
          ? s`bg-green-400 border-green-500 text-white`
          : s`bg-red-400 border-red-500 text-white`;
      }
    }
    return option === selectedButton
      ? s`bg-blue-200 border-blue-400`
      : s`bg-warmGray-100 border-gray-100`;
  };

  return (
    <View style={s`flex flex-row flex-wrap items-center justify-center`}>
      {options.map((option, index) => {
        if (submitted && option !== selectedButton) return null; // Hide non-selected buttons after submission
        return (
          <TouchableOpacity
            key={index}
            style={[
              s`w-96 p-3 m-1 items-center justify-center rounded-lg border`,
              getButtonStyle(option),
            ]}
            onPress={() => handleButtonPress(option, index)}
            disabled={submitted}>
            <Text style={s`text-xl`}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SingleSelectionButtons;
