import React from 'react';
import {Button, SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import LoginScreen from './src/screens/Login';
import NotifeeScreen from './src/screens/Notifee';

const Stack = createNativeStackNavigator();

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            options={{title: 'Home'}}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Login"
            options={{title: 'Login'}}
            component={LoginScreen}
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
