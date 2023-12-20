import {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {s} from 'react-native-wind';

interface MultiSelectionButtonsProps {
  options: string[];
  correctAnswers: string[];
  chosenAnswers: string[];
  submitted: boolean;
  eventAnswered: boolean;
  onAnswerEvaluation: (evaluation: any) => void;
  onSelection: (selectedIndices: number[]) => void;
}

interface AnswerEvaluation {
  [key: string]: {
    selected: boolean;
    correct: boolean;
    chosen: boolean;
  };
}

const MultiSelectionButtons: React.FC<MultiSelectionButtonsProps> = ({
  options,
  correctAnswers,
  chosenAnswers,
  submitted,
  eventAnswered,
  onAnswerEvaluation = () => {},
  onSelection,
}) => {
  const [answersEvaluation, setAnswersEvaluation] = useState<AnswerEvaluation>(
    {},
  );
  const [selectedButtons, setSelectedButtons] = useState<Set<string>>(
    new Set(),
  );
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  useEffect(() => {
    const initialEvaluation: AnswerEvaluation = {};
    options.forEach(option => {
      initialEvaluation[option] = {
        selected: false,
        correct: false,
        chosen: false,
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
          chosen: chosenAnswers.includes(option),
        };
      });
      setAnswersEvaluation(evaluation);
      onAnswerEvaluation(evaluation);
    }
  }, [submitted, options, correctAnswers, chosenAnswers, selectedButtons]);

  // Separate useEffect for handling selection on submission
  useEffect(() => {
    if (submitted) {
      onSelection(Array.from(selectedIndices)); // Call onSelection with the current indices
    }
  }, [submitted]); // Depend only on submitted

  const handleButtonPress = (option: string, index: number) => {
    if (submitted) return; // Disable changes after submission

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
  };

  const getButtonStyle = (option: string) => {
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
    if (submitted && selectedButtons.has(option)) {
      return result.correct
        ? s`border-4 bg-green-400 border-black`
        : s`border-4 bg-red-400 border-black`;
    }
    // Color for all non-selected answers when an event is submitted
    if (submitted && result) {
      return result.correct ? s`bg-green-400` : s`bg-red-400`;
    }
    // Color and border for when the user selects an option
    // and deselects it before submitting
    return selectedButtons.has(option)
      ? s`bg-blue-200 border-blue-400`
      : s`bg-warmGray-100 border-gray-100`;
  };

  return (
    <View style={s`flex flex-row flex-wrap items-center justify-center`}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            s`p-2 px-3 m-1 items-center justify-center rounded-lg`,
            getButtonStyle(option),
          ]}
          onPress={() => handleButtonPress(option, index)}
          disabled={submitted}>
          <Text style={s`text-xl`}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default MultiSelectionButtons;
