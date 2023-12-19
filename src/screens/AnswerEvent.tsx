import React, {useEffect, useState, useRef} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {s} from 'react-native-wind';
import MultiSelectionButtons from '../components/MultiSelectionButtons';
import {useScenarioController} from '../components/ScenarioControllerContext';
import SingleSelectionButtons from '../components/SingleSelectionButtons';
import ViewContainer from '../components/ViewContainer';

function AnswerEventScreen({route}) {
  const controller = useScenarioController();
  const event = route.params?.event;
  const [submitted, setSubmitted] = useState(false);
  const [selectedTreatmentIndex, setSelectedTreatmentIndex] = useState(null);
  const [selectedSymptomIndices, setSelectedSymptomIndices] = useState([]);
  const [selectedCauseIndices, setSelectedCauseIndices] = useState([]);

  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      // Use the updated values after state has been updated
      console.log('Selected Treatment Index:', selectedTreatmentIndex);

      console.log(
        'Selected Symptom Indices:',
        Array.from(selectedSymptomIndices),
      );

      console.log('Selected Cause Indices:', Array.from(selectedCauseIndices));

      // Other logic you want to execute after state updates
      const date = new Date(event.dateObject);
      if (selectedTreatmentIndex != null) {
        const symptomIndicesArray = Array.from(
          selectedSymptomIndices,
        ) as number[];
        const causeIndicesArray = Array.from(selectedCauseIndices) as number[];

        controller.storage.updateEvent(
          date,
          selectedTreatmentIndex,
          symptomIndicesArray,
          causeIndicesArray,
        );
        console.log(
          date,
          selectedTreatmentIndex,
          symptomIndicesArray,
          causeIndicesArray,
        );
      }
    }
  }, [selectedTreatmentIndex, selectedSymptomIndices, selectedCauseIndices]);

  const handleTreatmentSelection = index => {
    setSelectedTreatmentIndex(index);
  };

  const handleSymptomSelection = indices => {
    setSelectedSymptomIndices(indices); // Update state with received array
  };

  const handleCauseSelection = indices => {
    setSelectedCauseIndices(indices); // Update state with received array
  };

  // Function to extract correct answers
  const getCorrectAnswers = items =>
    items.filter(item => item.correct.correct).map(item => item.correct.option);

  const correctSymptoms = getCorrectAnswers(event.symptoms);
  const correctTreatment = getCorrectAnswers(event.treatment);
  const correctCause = getCorrectAnswers(event.cause);

  // Function to handle the submission of all answers
  const handleSubmitAll = () => {
    setSubmitted(true);
  };

  if (!event) {
    return <Text>No Event Data</Text>;
  }

  return (
    <ViewContainer style={s`flex h-full items-center`}>
      <ScrollView style={s`w-full`}>
        <Text
          style={s`text-4xl text-black font-semibold w-80 text-center my-4`}>
          {event.title}
        </Text>
        {/* Treatment */}
        <View style={s`items-center`}>
          <Text style={s`text-2xl text-black font-semibold`}>Behandling</Text>
          <Text style={s`text-sm`}>Välj en</Text>
          <SingleSelectionButtons
            options={event.treatment.map(t => t.correct.optionString)}
            correctAnswers={correctTreatment}
            submitted={submitted}
            onAnswerEvaluation={() => {}}
            onSelection={handleTreatmentSelection}
          />
        </View>

        {/* Symptoms */}
        <View style={s`items-center`}>
          <Text style={s`text-2xl text-black font-semibold`}>Symptom</Text>
          <Text style={s`text-sm`}>Välj flera</Text>
          <MultiSelectionButtons
            options={event.symptoms.map(s => s.correct.optionString)}
            correctAnswers={correctSymptoms}
            submitted={submitted}
            onAnswerEvaluation={() => {}}
            onSelection={handleSymptomSelection}
          />
        </View>

        {/* Cause */}
        <View style={s`items-center`}>
          <Text style={s`text-2xl text-black font-semibold`}>Orsak</Text>
          <Text style={s`text-sm`}>Välj flera</Text>
          <MultiSelectionButtons
            options={event.cause.map(c => c.correct.optionString)}
            correctAnswers={correctCause}
            submitted={submitted}
            onAnswerEvaluation={() => {}}
            onSelection={handleCauseSelection}
          />
        </View>

        {/* Submit All Button */}
        <TouchableOpacity
          style={s`bg-blue-500 p-3 rounded-lg m-2`}
          onPress={handleSubmitAll}
          disabled={submitted}>
          <Text style={s`text-white`}>Submit All</Text>
        </TouchableOpacity>
      </ScrollView>
    </ViewContainer>
  );
}

export default AnswerEventScreen;
