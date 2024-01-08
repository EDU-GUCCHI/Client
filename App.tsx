import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, Platform, View, Linking } from 'react-native';

import HomeScreen from './src/screens/Home';
import CreateGotchiScreen from './src/screens/CreateGotchi';
import TutorialScreen from './src/screens/Tutorial';
import MyDayScreen from './src/screens/MyDay';
import InstructionsScreen from './src/screens/Instructions';
import MyGotchiScreen from './src/screens/MyGotchi';
import AnswerEventScreen from './src/screens/AnswerEvent';
import AboutGotchiScreen from './src/screens/AboutGotchi';
import BeforeWeBeginScreen from './src/screens/BeforeWeBegin';
import { ScenarioControllerProvider } from './src/components/ScenarioControllerContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const SCREEN_PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

const App = () => {
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(SCREEN_PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <ScenarioControllerProvider>
      <NavigationContainer 
      initialState={initialState} 
      onStateChange={(state => {
        console.log("STATE: " + JSON.stringify(state))
        AsyncStorage.setItem(SCREEN_PERSISTENCE_KEY, JSON.stringify(state));
      })}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
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
