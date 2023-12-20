import {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {s} from 'react-native-wind';

const SingleSelectionButtons = ({
  options,
  correctAnswers,
  chosenAnswers,
  eventAnswered,
  onAnswerEvaluation = () => {},
  submitted,
  onSelection, // Receive the onSelection prop
}) => {
  const [selectedButton, setSelectedButton] = useState(null); // Changed to null for single selection
  const [answersEvaluation, setAnswersEvaluation] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
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
      const evaluation = {};
      options.forEach(option => {
        evaluation[option] = {
          selected: option === selectedButton,
          correct: correctAnswers.includes(option),
          chosen: chosenAnswers.includes(option),
        };
      });
      setAnswersEvaluation(evaluation);
      onAnswerEvaluation(evaluation);
    }
  }, [submitted, options, correctAnswers, chosenAnswers, selectedButton]);

  useEffect(() => {
    if (submitted) {
      onSelection(selectedIndex); // Call onSelection with the current indices
    }
  }, [submitted]); // Depend only on submitted

  const handleButtonPress = (option, index) => {
    if (submitted) return; // Disable changes after submission

    if (selectedButton === option) {
      // Deselect if the same button is pressed again
      setSelectedButton(null);
      setSelectedIndex(null);
    } else {
      setSelectedButton(option);
      setSelectedIndex(index);
    }
  };

  const getButtonStyle = option => {
    const result = answersEvaluation[option];
    if (!result) return s`bg-warmGray-100 border-gray-100`; // Fallback style

    // Color and border for selected correct and incorrect answers when
    // viewing an already answered event
    if (eventAnswered && result.chosen) {
      return result.correct
        ? s`border-4 bg-green-400 border-black`
        : s`border-4 bg-red-400 border-black`;
    }
    // Color and border for selected correct and incorrect answers when
    // an event is submitted and the user is viewing the results
    if (submitted && selectedButton === option) {
      return result.correct
        ? s`border-4 bg-green-400 border-black`
        : s`border-4 bg-red-400 border-black`;
    }
    // Color for all non-selected answers when an event is submitted
    if (submitted && result) {
      return result.correct
        ? s`bg-green-400 border-green-500 text-white`
        : s`bg-red-400 border-red-500 text-white`;
    }
    // Color and border for when the user selects an option
    // and deselects it before submitting
    return option === selectedButton
      ? s`bg-blue-200 border-blue-400`
      : s`bg-warmGray-100 border-gray-100`;
  };

  return (
    <View style={s`flex flex-row flex-wrap items-center justify-center`}>
      {options.map((option, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[
              s`w-96 p-3 m-1 items-center justify-center rounded-lg`,
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
