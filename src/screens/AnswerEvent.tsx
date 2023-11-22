import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {s} from 'react-native-wind';
import MultiSelectionButtons from '../components/MultiSelectionButtons';
import SingleSelectionButtons from '../components/SingleSelectionButtons';
import ViewContainer from '../components/ViewContainer';

type RootStackParamList = {
  CreateGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'CreateGotchi'>;

type Props = {
  navigation: NavigationProp;
};

function AnswerEventScreen({route, navigation}) {
  const event = route.params?.event; // Retrieve the passed event data

  // Function to extract correct answers
  const getCorrectAnswers = items =>
    items.filter(item => item.correct.correct).map(item => item.correct.option);

  // Extract correct answers for each category
  const correctSymptoms = getCorrectAnswers(event.symptoms);
  const correctTreatment = getCorrectAnswers(event.treatment);
  const correctCause = getCorrectAnswers(event.cause);

  const firstSymptom =
    event.symptoms.length > 0
      ? event.symptoms[1].correct.option
      : 'No symptoms';

  if (!event) {
    // Handle the case where no event data is passed
    return <Text>No Event Data</Text>;
  }

  return (
    <ViewContainer style={s`flex h-full items-center`}>
      <Text style={s`text-4xl text-black font-semibold w-80 text-center my-4`}>
        {event.title}
      </Text>

      {/* Symptoms */}
      <View style={s`items-center`}>
        <Text style={s`text-2xl text-black font-semibold`}>Symptom</Text>
        <Text style={s`text-sm`}>Välj flera</Text>
        <MultiSelectionButtons
          options={event.symptoms.map(s => s.correct.option)}
          correctAnswers={correctSymptoms}
        />
      </View>

      {/* Treatment */}
      <View style={s`items-center`}>
        <Text style={s`text-2xl text-black font-semibold`}>Treatment</Text>
        <Text style={s`text-sm`}>Välj flera</Text>
        <MultiSelectionButtons
          options={event.treatment.map(t => t.correct.option)}
          correctAnswers={correctTreatment}
        />
      </View>

      {/* Cause */}
      <View style={s`items-center`}>
        <Text style={s`text-2xl text-black font-semibold`}>Cause</Text>
        <Text style={s`text-sm`}>Välj flera</Text>
        <MultiSelectionButtons
          options={event.cause.map(c => c.correct.option)}
          correctAnswers={correctCause}
        />
      </View>
    </ViewContainer>
  );
}

export default AnswerEventScreen;
