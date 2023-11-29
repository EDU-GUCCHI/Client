import {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {s} from 'react-native-wind';

type SingleSelectionButtonsProps = {
  options: string[];
  correctAnswers: string[];
  submitted: boolean;
  onAnswerEvaluation?: (selectedOption: string) => void;
};
const SingleSelectionButtons = ({
  options,
  correctAnswers,
  submitted,
  onAnswerEvaluation = () => {},
}) => {
  const [selectedButton, setSelectedButton] = useState(null); // Changed to null for single selection
  const [answersEvaluation, setAnswersEvaluation] = useState({});

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
      onAnswerEvaluation(evaluation); // Callback to inform parent about the evaluation
    }
  }, [submitted, options, correctAnswers, selectedButton]);

  const handleButtonPress = option => {
    if (submitted) return;
    setSelectedButton(option);
    if (onAnswerEvaluation) {
      onAnswerEvaluation(option); // Pass the selected option
    }
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
            onPress={() => handleButtonPress(option)}
            disabled={submitted}>
            <Text style={s`text-xl`}>{option}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default SingleSelectionButtons;
