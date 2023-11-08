import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, View, TouchableOpacity, ScrollView, ViewBase} from 'react-native';
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
    <ViewContainer>
      <ScrollView>
        <Text
          style={s`text-4xl text-center mb-1 text-warmGray-600 font-semibold`}>
          Tuesday
        </Text>
        <Text style={s`text-2xl py-2 text-center text-warmGray-600 font-semibold`}>
          31/10/2023
        </Text>

        <MyDayEvent
          navigation={navigation}
          eventTime={events.time}
          eventTitle={events.title}
          colors={['#F6F1E8', '#66CEFF']}
          locations={[0.8, 0.2]}
          useAngle={true}
          angle={25}
          angleCenter={{x: 0.5, y: 1}}
        />

  <MyDayEvent
          navigation={navigation}
          eventTime={events.time}
          eventTitle={events.title}
          colors={['#F6F1E8', '#66CEFF']}
          locations={[0.8, 0.2]}
          useAngle={true}
          angle={25}
          angleCenter={{x: 0.5, y: 1}}
        />

  <MyDayEvent
          navigation={navigation}
          eventTime={events.time}
          eventTitle={events.title}
          colors={['#F6F1E8', '#66CEFF']}
          locations={[0.8, 0.2]}
          useAngle={true}
          angle={25}
          angleCenter={{x: 0.5, y: 1}}
        />
      </ScrollView>
    </ViewContainer>
  );
}

export default MyDayScreen;
