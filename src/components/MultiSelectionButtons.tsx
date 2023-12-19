import {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {s} from 'react-native-wind';

const MultiSelectionButtons = ({
  options,
  correctAnswers,
  submitted,
  onAnswerEvaluation = () => {},
  onSelection, // New prop for handling selection
}) => {
  const [answersEvaluation, setAnswersEvaluation] = useState({});
  const [selectedButtons, setSelectedButtons] = useState<Set<string>>(
    new Set(),
  );
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  useEffect(() => {
    // Initialize answersEvaluation with all options
    const initialEvaluation = {};
    options.forEach((option, index) => {
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
      options.forEach((option, index) => {
        evaluation[option] = {
          selected: selectedButtons.has(option),
          correct: correctAnswers.includes(option),
        };
      });
      setAnswersEvaluation(evaluation);
      onAnswerEvaluation(evaluation);
    }
  }, [submitted, options, correctAnswers, selectedButtons]);

  // Separate useEffect for handling selection on submission
  useEffect(() => {
    if (submitted) {
      onSelection(Array.from(selectedIndices)); // Call onSelection with the current indices
    }
  }, [submitted]); // Depend only on submitted

  const handleButtonPress = (option: string, index: number) => {
    if (submitted) return;
    const newSelectedButtons = new Set(selectedButtons);
    let newSelectedIndices = [...selectedIndices];

    if (newSelectedButtons.has(option)) {
      newSelectedButtons.delete(option);
      newSelectedIndices = newSelectedIndices.filter(i => i !== index);
    } else {
      newSelectedButtons.add(option);
      newSelectedIndices.push(index);
    }

    setSelectedButtons(newSelectedButtons);
    setSelectedIndices(newSelectedIndices);

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
    return selectedButtons.has(option)
      ? s`bg-blue-200 border-blue-400`
      : s`bg-warmGray-100 border-gray-100`;
  };

  return (
    <View style={s`flex flex-row flex-wrap items-center justify-center`}>
      {options.map((option, index) => {
        if (submitted && !selectedButtons.has(option)) return null; // Hide non-selected buttons after submission
        return (
          <TouchableOpacity
            key={index}
            style={[
              s`p-2 px-3 m-1 items-center justify-center rounded-lg border`,
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

export default MultiSelectionButtons;
