import React from 'react';
import {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/screens/Home';
import CreateGotchiScreen from './src/screens/CreateGotchi';
import TutorialScreen from './src/screens/Tutorial';
import MyDayScreen from './src/screens/MyDay';
import InstructionsScreen from './src/screens/Instructions';
import MyGotchiScreen from './src/screens/MyGotchi';
import AnswerEventScreen from './src/screens/AnswerEvent';
import AboutGotchiScreen from './src/screens/AboutGotchi';
import BeforeWeBeginScreen from './src/screens/BeforeWeBegin'
import notifee, { AuthorizationStatus } from '@notifee/react-native';

import { ScenarioControllerProvider, useScenarioController } from './src/components/ScenarioControllerContext';
import { Settings } from 'react-native';

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
            component={TutorialScreen}
          />
          <Stack.Screen
            name="BeforeWeBegin"
            options={{title: 'Viktigt!'}}
            component={BeforeWeBeginScreen}
          />
          <Stack.Screen
            name="CreateGotchi"
            options={{title: 'Skapa din Gotchi'}}
            component={CreateGotchiScreen}
          />
          <Stack.Screen
            name="Home"
            options={{title: 'Hem', headerBackVisible: false}}
            component={HomeScreen}
          />
          <Stack.Screen
            name="MyDay"
            options={{title: 'Min Vecka'}}
            component={MyDayScreen}
          />
          <Stack.Screen
            name="Instructions"
            options={{title: 'Instruktioner'}}
            component={InstructionsScreen}
          />
          <Stack.Screen
            name="MyGotchi"
            options={{title: 'Min Gotchi'}}
            component={MyGotchiScreen}
          />
          <Stack.Screen
            name="AnswerEvent"
            options={{title: 'Välj Handling'}}
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
