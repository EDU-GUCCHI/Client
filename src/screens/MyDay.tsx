import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, View, TouchableOpacity, ScrollView} from 'react-native';
import {s} from 'react-native-wind';

import MyDayEvent from '../components/MyDayComponents/MyDayEvent';
import ViewContainer from '../components/ViewContainer'


type RootStackParamList = {
  CreateGotchi: undefined;
  AnswerEvent : undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'CreateGotchi'>;

type Props = {
  navigation: NavigationProp;
};

// Här ska vi hämta event och uppdatera elementen med dess innehåll
const events = {
  time: '13:23',
  title: 'Low blood sugar while working out',
  symptoms: 'Feeling dizzy',
  treatment: 'Insulin shot',
  cause: 'Working out too hard',
};

function MyDayScreen({navigation}: Props) {
  return (
    <ScrollView>
      <ViewContainer>
        <Text
          style={s`text-4xl text-center m-4 mb-1 text-warmGray-600 font-semibold`}>
          Tuesday
        </Text>
        <Text style={s`text-2xl text-center text-warmGray-600 font-semibold`}>
          31/10/2023
        </Text>

        <MyDayEvent
          navigation={navigation}
          eventTime={events.time}
          eventTitle={events.title}
          eventSymptom={events.symptoms}
          eventTreatment={events.treatment}
          eventCause={events.cause}
        />
        <MyDayEvent
          navigation={navigation}
          eventTime={events.time}
          eventTitle={events.title}
          eventSymptom={events.symptoms}
          eventTreatment={events.treatment}
          eventCause={events.cause}
        />
        <MyDayEvent
          navigation={navigation}
          eventTime={events.time}
          eventTitle={events.title}
          eventSymptom={events.symptoms}
          eventTreatment={events.treatment}
          eventCause={events.cause}
        />
      </ViewContainer>
    </ScrollView>
  );
}

export default MyDayScreen;
