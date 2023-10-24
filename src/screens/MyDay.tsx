import React from 'react';
import styles from '../styles/style.js';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import {Text, View, TouchableOpacity} from 'react-native';

type RootStackParamList = {
  CreateGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'CreateGotchi'>;

type Props = {
  navigation: NavigationProp;
};

function MyDayScreen({navigation}: Props) {
  return (
    <View style={styles.mainContainer}>
      {/* TutorialScreen */}

      <View style={MyDayScreenStyles.statContainerLight}>
        <Text style={MyDayScreenStyles.eventText}>Event</Text>
        <Text style={MyDayScreenStyles.eventInformation}>13.22 - Increasingly rapid heartbeat while in the store:</Text>
        <Text style={MyDayScreenStyles.eventSymptoms}>Symptoms: Sweating</Text>
        <Text style={MyDayScreenStyles.eventTreatment}>Treatment: Eat a candy</Text>
        <Text style={MyDayScreenStyles.eventCause}>Caused by: Missing a meal (lunch)</Text>
      </View>

      <View style={MyDayScreenStyles.statContainerLight}>
        <Text style={MyDayScreenStyles.eventText}>Event</Text>
        <Text style={MyDayScreenStyles.eventInformation}>18.43 - Low blood sugar while working out:</Text>
        <Text style={MyDayScreenStyles.eventSymptoms}>Symptoms: Feeling dizzy</Text>
        <Text style={MyDayScreenStyles.eventTreatment}>Treatment: Insulin shot</Text>
        <Text style={MyDayScreenStyles.eventCause}>Caused by: Working out too hard</Text>
      </View>

      <View style={MyDayScreenStyles.statContainerLight}>
        <Text style={MyDayScreenStyles.eventText}>Event</Text>
        <Text style={MyDayScreenStyles.eventInformation}></Text>
        <Text style={MyDayScreenStyles.eventSymptoms}></Text>
        <Text style={MyDayScreenStyles.eventTreatment}></Text>
        <Text style={MyDayScreenStyles.eventCause}></Text>
      </View>

    </View>
  );
}

export default MyDayScreen;



const neonRed = '#FF2C55';
const neonBlue = '#0AD4FA';
const neonGreen = '#02E67E';
const neonPink = '#FF66D9';
const neonLight = '#E9F1F7';
const neonDark = '#1E2532';

const MyDayScreenStyles = StyleSheet.create({
  statContainerLight: {
    flex: 1,
    backgroundColor: neonLight,
    padding: 20,
    margin: 15,
    borderRadius: 20,
  },
  eventText: {
    padding: 10,
    textAlign: "center",
    fontWeight: "bold"
  },
  eventInformation: {
    padding: 5
  },
  eventSymptoms: {
    padding: 5
  },
  eventTreatment: {
    padding: 5
  },
  eventCause: {
    padding: 5
  }
})
