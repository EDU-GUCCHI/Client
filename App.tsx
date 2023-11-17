import React from 'react';
import {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/screens/Home';
import CreateGotchiScreen from './src/screens/CreateGotchi';
import NotifeeScreen from './src/screens/Notifee';
import TutorialScreen from './src/screens/Tutorial';
import MyDayScreen from './src/screens/MyDay';
import InstructionsScreen from './src/screens/Instructions';
import MyGotchiScreen from './src/screens/MyGotchi';
import AnswerEventScreen from './src/screens/AnswerEvent';
import AboutGotchiScreen from './src/screens/AboutGotchi';

import { ScenarioControllerProvider } from './src/components/ScenarioControllerContext';

const Stack = createNativeStackNavigator();

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <ScenarioControllerProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TutorialScreen">
          <Stack.Screen
            name="Tutorial"
            options={{title: 'Tutorial'}}
            component={TutorialScreen}
          />
          <Stack.Screen
            name="CreateGotchi"
            options={{title: 'Create'}}
            component={CreateGotchiScreen}
          />
          <Stack.Screen
            name="Home"
            options={{title: 'Home', headerBackVisible: false}}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Notifee"
            options={{title: 'Notifee'}}
            component={NotifeeScreen}
          />
          <Stack.Screen
            name="MyDay"
            options={{title: 'My Day'}}
            component={MyDayScreen}
          />
          <Stack.Screen
            name="Instructions"
            options={{title: 'Instructions'}}
            component={InstructionsScreen}
          />
          <Stack.Screen
            name="MyGotchi"
            options={{title: 'My Gotchi'}}
            component={MyGotchiScreen}
          />
          <Stack.Screen
            name="AnswerEvent"
            options={{title: 'Answer Event'}}
            component={AnswerEventScreen}
          />
          <Stack.Screen
            name="AboutGotchi"
            options={{title: 'Om min Gotchi'}}
            component={AboutGotchiScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </ScenarioControllerProvider>
    );
  }
}
