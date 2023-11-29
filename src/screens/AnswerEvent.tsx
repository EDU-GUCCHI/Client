import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {s} from 'react-native-wind';
import {useScenarioController} from '../components/ScenarioControllerContext';

import MultiSelectionButtons from '../components/MultiSelectionButtons';
import SingleSelectionButtons from '../components/SingleSelectionButtons';
import ViewContainer from '../components/ViewContainer';


function AnswerEventScreen({route}) {
  const event = route.params?.event;
  const controller = useScenarioController(); // retreive Controller instance

  const [submitted, setSubmitted] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [selectedSymptoms, setselectedSymptom] = useState(new Set());
  const [selectedCauses, setselectedCauses] = useState(new Set());

  const handleTreatmentSelection = selectedOption => {
    setSelectedTreatment(selectedOption);
  };

  const handleSymptomsSelection = selectedOption => {
    setselectedSymptom(selectedOption);
  };

  const handleCausesSelection = selectedOption => {
    setselectedCauses(selectedOption);
  };

  // Function to extract correct answers
  const getCorrectAnswers = items =>
    items.filter(item => item.correct.correct).map(item => item.correct.option);

  const correctSymptoms = getCorrectAnswers(event.symptoms);
  const correctTreatment = getCorrectAnswers(event.treatment);
  const correctCause = getCorrectAnswers(event.cause);

  // Function to handle the submission of all answers
  const handleSubmitAll = () => {
    console.log('Selected Treatment:', selectedTreatment);
    console.log('Selected Symptoms:', Array.from(selectedSymptoms));
    console.log('Selected Causes:', Array.from(selectedCauses));

    setSubmitted(true);
    controller.updateEventWithOptionsAnswered(
      event.id,
      selectedTreatment,
      Array.from(selectedSymptoms),
      Array.from(selectedCauses),
    );
  };

  /* const handleSubmitAll = () => {
    setSubmitted(true);
    controller.updateEventWithOptionsAnswered(
      event.id,
      selectedTreatment,
      selectedSymptoms,
      selectedCauses,
    );
    const split = event;
    console.log(split)
  }; */

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
            options={event.treatment.map(t => t.correct.option)}
            correctAnswers={correctTreatment}
            submitted={submitted}
            onAnswerEvaluation={() => handleTreatmentSelection(selectedTreatment)}
          />
        </View>

        {/* Symptoms */}
        <View style={s`items-center`}>
          <Text style={s`text-2xl text-black font-semibold`}>Symptom</Text>
          <Text style={s`text-sm`}>Välj flera</Text>
          <MultiSelectionButtons
            options={event.symptoms.map(s => s.correct.option)}
            correctAnswers={correctSymptoms}
            submitted={submitted}
            onAnswerEvaluation={() => {}}
          />
        </View>

        {/* Cause */}
        <View style={s`items-center`}>
          <Text style={s`text-2xl text-black font-semibold`}>Orsak</Text>
          <Text style={s`text-sm`}>Välj flera</Text>
          <MultiSelectionButtons
            options={event.cause.map(c => c.correct.option)}
            correctAnswers={correctCause}
            submitted={submitted}
            onAnswerEvaluation={() => {}}
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
