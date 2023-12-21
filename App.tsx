import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar, Platform, View} from 'react-native';

import HomeScreen from './src/screens/Home';
import CreateGotchiScreen from './src/screens/CreateGotchi';
import TutorialScreen from './src/screens/Tutorial';
import MyDayScreen from './src/screens/MyDay';
import InstructionsScreen from './src/screens/Instructions';
import MyGotchiScreen from './src/screens/MyGotchi';
import AnswerEventScreen from './src/screens/AnswerEvent';
import AboutGotchiScreen from './src/screens/AboutGotchi';
import BeforeWeBeginScreen from './src/screens/BeforeWeBegin';
import {ScenarioControllerProvider} from './src/components/ScenarioControllerContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ScenarioControllerProvider>
      <NavigationContainer>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Stack.Navigator
            initialRouteName="TutorialScreen"
            screenOptions={{
              headerShown: false,
              animation: 'fade',
            }}>
            <Stack.Screen name="Tutorial" component={TutorialScreen} />
            <Stack.Screen
              name="BeforeWeBegin"
              component={BeforeWeBeginScreen}
            />
            <Stack.Screen name="CreateGotchi" component={CreateGotchiScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="MyDay" component={MyDayScreen} />
            <Stack.Screen name="Instructions" component={InstructionsScreen} />
            <Stack.Screen name="MyGotchi" component={MyGotchiScreen} />
            <Stack.Screen name="AnswerEvent" component={AnswerEventScreen} />
            <Stack.Screen name="AboutGotchi" component={AboutGotchiScreen} />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </ScenarioControllerProvider>
  );
};

export default App;
