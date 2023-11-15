import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, View, TouchableOpacity, ScrollView, ViewBase} from 'react-native';
import {s} from 'react-native-wind';

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
const weeklyEvents = [
  {
    date: '13/11/2023',
    day: 'Måndag',
    events: [
      {
        time: '08:00',
        title: 'Event 1',
        symptoms: [
          {option: 'Alternative 1', correct: true, answered: false},
          {option: 'Alternative 2', correct: true, answered: false},
          {option: 'Alternative 3', correct: false, answered: false},
          {option: 'Alternative 4', correct: false, answered: false},
          {option: 'Alternative 5', correct: true, answered: false},
          // ... more alternatives
        ],
        treatment: [
          {option: 'Alternative 1', correct: false, answered: false},
          {option: 'Alternative 2', correct: true, answered: false},
          {option: 'Alternative 3', correct: false, answered: false},
          {option: 'Alternative 4', correct: true, answered: false},
          {option: 'Alternative 5', correct: false, answered: false},
          // ... more alternatives
        ],
        cause: [
          {option: 'Alternative 1', correct: false, answered: false},
          {option: 'Alternative 2', correct: false, answered: false},
          {option: 'Alternative 3', correct: true, answered: false},
          {option: 'Alternative 4', correct: false, answered: false},
          {option: 'Alternative 5', correct: true, answered: false},
          // ... more alternatives
        ],
      },
      {
        time: '11:30',
        title: 'Event 2',
        symptoms: [
          {option: 'Alternative 1', correct: true, answered: false},
          {option: 'Alternative 2', correct: true, answered: false},
          {option: 'Alternative 3', correct: false, answered: false},
          {option: 'Alternative 4', correct: false, answered: false},
          {option: 'Alternative 5', correct: true, answered: false},
          // ... more alternatives
        ],
        treatment: [
          {option: 'Alternative 1', correct: false, answered: false},
          {option: 'Alternative 2', correct: true, answered: false},
          {option: 'Alternative 3', correct: false, answered: false},
          {option: 'Alternative 4', correct: true, answered: false},
          {option: 'Alternative 5', correct: false, answered: false},
          // ... more alternatives
        ],
        cause: [
          {option: 'Alternative 1', correct: false, answered: false},
          {option: 'Alternative 2', correct: false, answered: false},
          {option: 'Alternative 3', correct: true, answered: false},
          {option: 'Alternative 4', correct: false, answered: false},
          {option: 'Alternative 5', correct: true, answered: false},
          // ... more alternatives
        ],
      },
      // ... more events for Måndag
    ],
  },
  {
    date: '14/11/2023',
    day: 'Tisdag',
    events: [
      {
        time: '09:25',
        title: 'Event 1',
        symptoms: [
          {option: 'Alternative 1', correct: true, answered: false},
          {option: 'Alternative 2', correct: true, answered: false},
          {option: 'Alternative 3', correct: false, answered: false},
          {option: 'Alternative 4', correct: false, answered: false},
          {option: 'Alternative 5', correct: true, answered: false},
          // ... more alternatives
        ],
        treatment: [
          {option: 'Alternative 1', correct: false, answered: false},
          {option: 'Alternative 2', correct: true, answered: false},
          {option: 'Alternative 3', correct: false, answered: false},
          {option: 'Alternative 4', correct: true, answered: false},
          {option: 'Alternative 5', correct: false, answered: false},
          // ... more alternatives
        ],
        cause: [
          {option: 'Alternative 1', correct: false, answered: false},
          {option: 'Alternative 2', correct: false, answered: false},
          {option: 'Alternative 3', correct: true, answered: false},
          {option: 'Alternative 4', correct: false, answered: false},
          {option: 'Alternative 5', correct: true, answered: false},
          // ... more alternatives
        ],
      },
      {
        time: '13:30',
        title: 'Event 2',
        symptoms: [
          {option: 'Alternative 1', correct: true, answered: false},
          {option: 'Alternative 2', correct: true, answered: false},
          {option: 'Alternative 3', correct: false, answered: false},
          {option: 'Alternative 4', correct: false, answered: false},
          {option: 'Alternative 5', correct: true, answered: false},
          // ... more alternatives
        ],
        treatment: [
          {option: 'Alternative 1', correct: false, answered: false},
          {option: 'Alternative 2', correct: true, answered: false},
          {option: 'Alternative 3', correct: false, answered: false},
          {option: 'Alternative 4', correct: true, answered: false},
          {option: 'Alternative 5', correct: false, answered: false},
          // ... more alternatives
        ],
        cause: [
          {option: 'Alternative 1', correct: false, answered: false},
          {option: 'Alternative 2', correct: false, answered: false},
          {option: 'Alternative 3', correct: true, answered: false},
          {option: 'Alternative 4', correct: false, answered: false},
          {option: 'Alternative 5', correct: true, answered: false},
          // ... more alternatives
        ],
      },
      // ... more events for Måndag
    ],
  },
  {
    date: '15/11/2023',
    day: 'Onsdag',
    events: [
      {
        time: '08:30',
        title: 'Event 1',
        symptoms: [
          {option: 'Alternative 1', correct: true, answered: false},
          {option: 'Alternative 2', correct: true, answered: false},
          {option: 'Alternative 3', correct: false, answered: false},
          {option: 'Alternative 4', correct: false, answered: false},
          {option: 'Alternative 5', correct: true, answered: false},
          // ... more alternatives
        ],
        treatment: [
          {option: 'Alternative 1', correct: false, answered: false},
          {option: 'Alternative 2', correct: true, answered: false},
          {option: 'Alternative 3', correct: false, answered: false},
          {option: 'Alternative 4', correct: true, answered: false},
          {option: 'Alternative 5', correct: false, answered: false},
          // ... more alternatives
        ],
        cause: [
          {option: 'Alternative 1', correct: false, answered: false},
          {option: 'Alternative 2', correct: false, answered: false},
          {option: 'Alternative 3', correct: true, answered: false},
          {option: 'Alternative 4', correct: false, answered: false},
          {option: 'Alternative 5', correct: true, answered: false},
          // ... more alternatives
        ],
      },
      {
        time: '10:30',
        title: 'Event 2',
        symptoms: [
          {option: 'Alternative 1', correct: true, answered: false},
          {option: 'Alternative 2', correct: true, answered: false},
          {option: 'Alternative 3', correct: false, answered: false},
          {option: 'Alternative 4', correct: false, answered: false},
          {option: 'Alternative 5', correct: true, answered: false},
          // ... more alternatives
        ],
        treatment: [
          {option: 'Alternative 1', correct: false, answered: false},
          {option: 'Alternative 2', correct: true, answered: false},
          {option: 'Alternative 3', correct: false, answered: false},
          {option: 'Alternative 4', correct: true, answered: false},
          {option: 'Alternative 5', correct: false, answered: false},
          // ... more alternatives
        ],
        cause: [
          {option: 'Alternative 1', correct: false, answered: false},
          {option: 'Alternative 2', correct: false, answered: false},
          {option: 'Alternative 3', correct: true, answered: false},
          {option: 'Alternative 4', correct: false, answered: false},
          {option: 'Alternative 5', correct: true, answered: false},
          // ... more alternatives
        ],
      },
      // ... more events for Måndag
    ],
  },
  // ... other days and events
];

function MyDayScreen({navigation}: Props) {
  const [currentDayIndex, setCurrentDayIndex] = useState(
    weeklyEvents.length - 1,
  ); // Set to last index

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
      <View style={s`flex-row justify-between px-3`}>
        {currentDayIndex > 0 && (
          <TouchableOpacity onPress={goToPreviousDay}>
            <Text style={s`text-2xl`}>← Previous</Text>
          </TouchableOpacity>
        )}
        {currentDayIndex < weeklyEvents.length - 1 && (
          <TouchableOpacity onPress={goToNextDay}>
            <Text style={s`text-2xl`}>Next →</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={s`items-center justify-start py-2`}>
        <View style={s`my-5`}>
          <Text
            style={s`text-4xl text-center mb-1 text-warmGray-600 font-semibold`}>
            {currentDay.day}
          </Text>
          <Text
            style={s`text-2xl py-2 text-center text-warmGray-600 font-semibold`}>
            {currentDay.date}
          </Text>
        </View>

        {currentDay.events.map((event, eventIndex) => (
          <MyDayEvent
            key={eventIndex}
            navigation={navigation}
            eventTime={event.time}
            eventTitle={event.title}
            colors={['#6ca7e8', '#70e0e1']}
            locations={[0, 0.8]}
            useAngle={true}
            angle={25}
            angleCenter={{x: 0.5, y: 0.6}}
          />
        ))}
      </View>
    </ViewContainer>
  );
}

export default MyDayScreen;
