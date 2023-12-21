import React, {useEffect, useState, useRef} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {s} from 'react-native-wind';

import {useScenarioController} from '../components/ScenarioControllerContext';
import MultiSelectionButtons from '../components/MultiSelectionButtons';
import SingleSelectionButtons from '../components/SingleSelectionButtons';
import ViewContainer from '../components/ViewContainer';
import BackButton from '../components/BackButton';

function AnswerEventScreen({route}) {
  const controller = useScenarioController();
  const event = route.params?.event;
  const [submitted, setSubmitted] = useState(false);

  const initialRender = useRef(true);

  // Determine if the event has already been answered
  const isEventAnswered = event.eventAnswered;

  const initializeSelectionIndices = options =>
    options
      .map((option, index) => (option.correct.optionChosen ? index : null))
      .filter(index => index !== null);

  const [selectedTreatmentIndex, setSelectedTreatmentIndex] = useState(
    isEventAnswered ? initializeSelectionIndices(event.treatment)[0] : null,
  );
  const [selectedSymptomIndices, setSelectedSymptomIndices] = useState(
    isEventAnswered ? initializeSelectionIndices(event.symptoms) : [],
  );
  const [selectedCauseIndices, setSelectedCauseIndices] = useState(
    isEventAnswered ? initializeSelectionIndices(event.cause) : [],
  );

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
    items
      .filter(item => item.correct.optionCorrect)
      .map(item => item.correct.optionString);

  const correctSymptoms = getCorrectAnswers(event.symptoms);
  const correctTreatment = getCorrectAnswers(event.treatment);
  const correctCause = getCorrectAnswers(event.cause);

  const getChosenAnswers = items =>
    items
      .filter(item => item.correct.optionChosen)
      .map(item => item.correct.optionString);

  const chosenSymptoms = getChosenAnswers(event.symptoms);
  const chosenTreatment = getChosenAnswers(event.treatment);
  const chosenCause = getChosenAnswers(event.cause);

  // Function to handle the submission of all answers
  const handleSubmitAll = () => {
    if (!isEventAnswered) {
      setSubmitted(true);
      // Rest of your submit logic
    }
  };

  if (!event) {
    return <Text>No Event Data</Text>;
  }

  // Render only selected options if event is answered, otherwise render all
  const renderOptions = (options, eventAnswered) =>
    eventAnswered ? options.filter(o => o.correct) : options;

  return (
    <ViewContainer style={s`flex h-full items-center`}>
      <BackButton />
      <ScrollView style={s`w-full mt-16`}>
        <View style={s`items-center`}>
          <Text
            style={s`text-4xl text-black font-semibold w-80 text-center my-4`}>
            {event.title}
          </Text>

          {/* Treatment */}
          <Text style={s`text-2xl text-black font-semibold`}>Behandling</Text>
          <Text style={s`text-sm`}>Välj en</Text>
          <SingleSelectionButtons
            options={renderOptions(event.treatment, isEventAnswered).map(
              t => t.correct.optionString,
            )}
            correctAnswers={correctTreatment}
            chosenAnswers={chosenTreatment}
            submitted={submitted || isEventAnswered}
            eventAnswered={isEventAnswered}
            onAnswerEvaluation={() => {}}
            onSelection={isEventAnswered ? () => {} : handleTreatmentSelection}
          />
        </View>

        {/* Symptoms */}
        <View style={s`items-center`}>
          <Text style={s`text-2xl text-black font-semibold`}>Symptom</Text>
          <Text style={s`text-sm`}>Välj flera</Text>
          <MultiSelectionButtons
            options={renderOptions(event.symptoms, isEventAnswered).map(
              s => s.correct.optionString,
            )}
            correctAnswers={correctSymptoms}
            chosenAnswers={chosenSymptoms}
            submitted={submitted || isEventAnswered}
            eventAnswered={isEventAnswered}
            onAnswerEvaluation={() => {}}
            onSelection={isEventAnswered ? () => {} : handleSymptomSelection}
          />
        </View>

        {/* Cause */}
        <View style={s`items-center`}>
          <Text style={s`text-2xl text-black font-semibold`}>Orsak</Text>
          <Text style={s`text-sm`}>Välj flera</Text>
          <MultiSelectionButtons
            options={renderOptions(event.cause, isEventAnswered).map(
              c => c.correct.optionString,
            )}
            correctAnswers={correctCause}
            chosenAnswers={chosenCause}
            submitted={submitted || isEventAnswered}
            eventAnswered={isEventAnswered}
            onAnswerEvaluation={() => {}}
            onSelection={isEventAnswered ? () => {} : handleCauseSelection}
          />
        </View>

        {/* Hide Submit All Button if event is answered */}
        {isEventAnswered ? null : (
          <TouchableOpacity
            style={s`bg-blue-500 p-3 rounded-lg m-2`}
            onPress={handleSubmitAll}>
            <Text style={s`text-white`}>Submit All</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </ViewContainer>
  );
}

export default AnswerEventScreen;
