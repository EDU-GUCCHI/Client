import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, View, TouchableOpacity, ScrollView, ViewBase } from 'react-native';
import { s } from 'react-native-wind';
import { useScenarioController } from '../components/ScenarioControllerContext';
import MyDayEvent from '../components/MyDayComponents/MyDayEvent';
import ViewContainer from '../components/ViewContainer';

type RootStackParamList = {
  CreateGotchi: undefined;
  AnswerEvent: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'CreateGotchi'>;

type Props = {
  navigation: NavigationProp;
};

// Här ska vi hämta event och uppdatera elementen med dess innehåll
const events = {
  time: '13:23',
  title: 'Low blood sugar',
  symptoms: 'Feeling dizzy',
  treatment: 'Insulin shot',
  cause: 'Working out too hard',
};


function MyDayScreen({navigation}: Props) {
  const controller = useScenarioController();
  
  return (
    <ViewContainer style={s`items-center justify-start h-full py-2`}>
      <View style={s`my-5`}>
        <Text
          style={s`text-4xl text-center mb-1 text-warmGray-600 font-semibold`}>
          Tuesday
        </Text>
        <Text
          style={s`text-2xl py-2text-center text-warmGray-600 font-semibold`}>
          31/10/2023
        </Text>
      </View>
      
      <MyDayEvent
        navigation={navigation}
        eventTime={events.time}
        eventTitle={events.title}
        colors={['#6ca7e8', '#70e0e1']}
        locations={[0, 0.8]}
        useAngle={true}
        angle={25}
        angleCenter={{x: 0.5, y: 0.6}}
      />

      <MyDayEvent
        navigation={navigation}
        eventTime={events.time}
        eventTitle={events.title}
        colors={['#6ca7e8', '#70e0e1']}
        locations={[0, 0.8]}
        useAngle={true}
        angle={25}
        angleCenter={{x: 0.5, y: 0.6}}
      />
    </ViewContainer>
  );
}

export default MyDayScreen;
