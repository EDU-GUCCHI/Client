import React, {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, View, TouchableOpacity, ScrollView, ViewBase} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {s} from 'react-native-wind';

import {useScenarioController} from '../components/ScenarioControllerContext';
import ViewContainer from '../components/ViewContainer';
import NonUserInteractableEvent from '../components/MyDayComponents/NonUserInteractableEvent';
import UserInteractableEvent from '../components/MyDayComponents/UserInteractableEvent';
import BackButton from '../components/BackButton';

type RootStackParamList = {
  CreateGotchi: undefined;
  AnswerEvent: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'CreateGotchi'>;

type Props = {
  navigation: NavigationProp;
};

function MyDayScreen({navigation}: Props) {
  const controller = useScenarioController();
  const [weeklyEvents, setWeeklyEvents] = useState(
    controller.storage.eventsJson || [],
  );

  // useFocusEffect to update weeklyEvents when the screen comes into focus
  useFocusEffect(() => {
    const updatedEvents = controller.storage.eventsJson || [];

    // Check if the events have changed before updating the state
    if (JSON.stringify(updatedEvents) !== JSON.stringify(weeklyEvents)) {
      setWeeklyEvents(updatedEvents);
    }
    //console.log(JSON.stringify(updatedEvents));
  });
  //console.log(weeklyEvents, 'weekly events ---------------'); // Ensure this is always an array

  const [currentDayIndex, setCurrentDayIndex] = useState(
    weeklyEvents.length > 0 ? weeklyEvents.length - 1 : 0,
  );

  const goToPreviousDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    }
  };

  const goToNextDay = () => {
    if (currentDayIndex < weeklyEvents.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };

  const currentDay = weeklyEvents[currentDayIndex];

  return (
    <ViewContainer style={s`flex-grow`}>
      <BackButton />

      <View style={s`py-2 mt-16`}>
        <View style={s`mb-5`}>
          <View style={s`w-full flex-row justify-between`}>
            {currentDayIndex > 0 ? (
              <TouchableOpacity onPress={goToPreviousDay} style={s`px-5 pb-5`}>
                <Text style={s`text-5xl`}>←</Text>
              </TouchableOpacity>
            ) : (
              <View style={s`px-5 pb-5`}>
                <Text style={s`text-5xl text-transparent`}>←</Text>
              </View> // Placeholder view with the same padding as the button
            )}
            <Text
              style={s`text-4xl text-center text-warmGray-600 font-semibold text-vertical-center`}>
              {currentDay.day}
            </Text>
            {currentDayIndex < weeklyEvents.length - 1 ? (
              <TouchableOpacity onPress={goToNextDay} style={s`px-5 pb-5`}>
                <Text style={s`text-5xl`}>→</Text>
              </TouchableOpacity>
            ) : (
              <View style={s`px-5 pb-5`}>
                <Text style={s`text-5xl text-transparent`}>→</Text>
              </View> // Placeholder view with the same padding as the button
            )}
          </View>
          <Text style={s`text-2xl text-center text-warmGray-600 font-semibold`}>
            {currentDay.date}
          </Text>
        </View>

        {currentDay.events.map((event, eventIndex) => {
          if (event.interactable === false) {
            return (
              <NonUserInteractableEvent
                key={eventIndex}
                eventTime={event.time}
                eventTitle={event.title}
                colors={['#9a9a9a', '#d4d4d4']}
                locations={[0, 0.8]}
                useAngle={true}
                angle={25}
                angleCenter={{x: 0.5, y: 0.6}}
              />
            );
          } else {
            return (
              <UserInteractableEvent
                key={eventIndex}
                eventData={event} // Pass the entire event object
                navigation={navigation}
                eventTime={event.time}
                eventTitle={event.title}
                colors={['#6ca7e8', '#70e0e1']}
                locations={[0, 0.8]}
                useAngle={true}
                angle={25}
                angleCenter={{x: 0.5, y: 0.6}}
              />
            );
          }
        })}
      </View>
    </ViewContainer>
  );
}

export default MyDayScreen;
