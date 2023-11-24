import React, {useState} from 'react';
import {
  View,
  ScrollView,
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

function AnswerEventScreen({ route, navigation }) {
  const event = route.params?.event;
  const [showSymptomSelection, setShowSymptomSelection] = useState(false);
  const [showTreatmentSelection, setShowTreatmentSelection] = useState(false);
  const [showCauseSelection, setShowCauseSelection] = useState(false);

  const getCorrectAnswers = (items) =>
    items.filter((item) => item.correct.correct).map((item) => item.correct.option);

  const correctSymptoms = getCorrectAnswers(event.symptoms);
  const correctTreatment = getCorrectAnswers(event.treatment);
  const correctCause = getCorrectAnswers(event.cause);

  if (!event) {
    return <Text>No Event Data</Text>;
  }

  const collapsedBoxStyle = s`border p-4 mb-4 rounded-lg w-80 relative`; // Set a fixed width for the collapsed state

  return (
    <ViewContainer style={s`flex h-full items-center p-4`}>
      {/* Symptom Section */}
      <TouchableOpacity onPress={() => setShowSymptomSelection(!showSymptomSelection)}>
        <View style={collapsedBoxStyle}>
          <View style={s`flex-row justify-between items-center`}>
            <Text style={s`text-2xl text-black font-semibold`}>
              Symptom
            </Text>
            <Text style={s`text-xl`}>{showSymptomSelection ? '↑' : '↓'}</Text>
          </View>
          {showSymptomSelection && (
            <MultiSelectionButtons
              options={event.symptoms.map((s) => s.correct.option)}
              correctAnswers={correctSymptoms}
            />
          )}
        </View>
      </TouchableOpacity>

      {/* Treatment Section */}
      <TouchableOpacity onPress={() => setShowTreatmentSelection(!showTreatmentSelection)}>
        <View style={collapsedBoxStyle}>
          <View style={s`flex-row justify-between items-center`}>
            <Text style={s`text-2xl text-black font-semibold`}>
              Treatment
            </Text>
            <Text style={s`text-xl`}>{showTreatmentSelection ? '↑' : '↓'}</Text>
          </View>
          {showTreatmentSelection && (
            <MultiSelectionButtons
              options={event.treatment.map((t) => t.correct.option)}
              correctAnswers={correctTreatment}
            />
          )}
        </View>
      </TouchableOpacity>

      {/* Cause Section */}
      <TouchableOpacity onPress={() => setShowCauseSelection(!showCauseSelection)}>
        <View style={collapsedBoxStyle}>
          <View style={s`flex-row justify-between items-center`}>
            <Text style={s`text-2xl text-black font-semibold`}>
              Cause
            </Text>
            <Text style={s`text-xl`}>{showCauseSelection ? '↑' : '↓'}</Text>
          </View>
          {showCauseSelection && (
            <MultiSelectionButtons
              options={event.cause.map((c) => c.correct.option)}
              correctAnswers={correctCause}
            />
          )}
        </View>
      </TouchableOpacity>
    </ViewContainer>
  );
}

export default AnswerEventScreen;




