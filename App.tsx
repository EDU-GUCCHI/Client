import React from 'react';
import {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import CreateGotchiScreen from './src/screens/CreateGotchi';
import NotifeeScreen from './src/screens/Notifee';
import TutorialScreen from './src/screens/Tutorial';

const Stack = createNativeStackNavigator();

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TutorialScreen">
          <Stack.Screen
            name="Tutorial"
            options={{title: 'Welcome to EDUGOTCHI'}}
            component={TutorialScreen}
          />
          <Stack.Screen
            name="CreateGotchi"
            options={{title: 'Welcome to EDUGOTCHI'}}
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
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
