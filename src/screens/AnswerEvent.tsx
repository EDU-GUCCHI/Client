import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { s } from 'react-native-wind';

import { useScenarioController } from '../components/ScenarioControllerContext';
import MultiSelectionButtons from '../components/MultiSelectionButtons';
import SingleSelectionButtons from '../components/SingleSelectionButtons';
import ViewContainer from '../components/ViewContainer';
import BackButton from '../components/BackButton';
import LgButton from '../components/LgButton';

type EventOption = {
  correct: {
    optionChosen: boolean;
    optionCorrect: boolean;
    optionString: string;
  };
};

type Event = {
  title: string;
  eventAnswered: boolean;
  dateObject: Date;
  treatment: EventOption[];
  symptoms: EventOption[];
  cause: EventOption[];
};

// Define a type for the screen's route parameter
type AnswerEventScreenRouteParamList = {
  AnswerEventScreen: {
    event: Event;
  };
};

type AnswerEventScreenProps = {
  route: RouteProp<AnswerEventScreenRouteParamList, 'AnswerEventScreen'>;
};

function AnswerEventScreen({ route }: AnswerEventScreenProps) {
  const controller = useScenarioController();
  const event = route.params?.event;
  const [submitted, setSubmitted] = useState(false);

  const initialRender = useRef(true);

  // Determine if the event has already been answered
  const isEventAnswered = event.eventAnswered;

  const initializeSelectionIndices = (options: EventOption[]) =>
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

  const handleTreatmentSelection = (index: number) => {
    setSelectedTreatmentIndex(index);
  };

  const handleSymptomSelection = (indices: number[]) => {
    setSelectedSymptomIndices(indices);
  };

  const handleCauseSelection = (indices: number[]) => {
    setSelectedCauseIndices(indices);
  };

  const getCorrectAnswers = (items: EventOption[]) =>
    items
      .filter(item => item.correct.optionCorrect)
      .map(item => item.correct.optionString);

  const getChosenAnswers = (items: EventOption[]) =>
    items
      .filter(item => item.correct.optionChosen)
      .map(item => item.correct.optionString);

  const correctSymptoms = getCorrectAnswers(event.symptoms);
  const correctTreatment = getCorrectAnswers(event.treatment);
  const correctCause = getCorrectAnswers(event.cause);
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
  const renderOptions = (options: EventOption[], eventAnswered: boolean) =>
    eventAnswered ? options.filter(o => o.correct) : options;

  return (
    <ViewContainer style={s`flex-1 justify-center items-center mt-0 mb-0`}>
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
            onAnswerEvaluation={() => { }}
            onSelection={isEventAnswered ? () => { } : handleTreatmentSelection}
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
            onAnswerEvaluation={() => { }}
            onSelection={isEventAnswered ? () => { } : handleSymptomSelection}
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
            onAnswerEvaluation={() => { }}
            onSelection={isEventAnswered ? () => { } : handleCauseSelection}
          />
        </View>

        {/* Hide Submit All Button if event is answered */}
        {!isEventAnswered && !submitted ? (
          <View style={s`flex-1 items-center mb-7`}>
            <LgButton
              text="Nästa"
              colors={['#70e0e1', '#6ca7e8']}
              locations={[0, 0.7]}
              useAngle={true}
              angle={25}
              angleCenter={{ x: 0.5, y: 0.5 }}
              onPress={handleSubmitAll}
            />
          </View>
        ) : null}
      </ScrollView>
    </ViewContainer>
  );
}

export default AnswerEventScreen;
