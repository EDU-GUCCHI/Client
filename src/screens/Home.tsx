import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {s} from 'react-native-wind';

import LgButton from '../components/LgButton';
import Title from '../components/Title';
import ViewContainer from '../components/ViewContainer';

type RootStackParamList = {
  Home: undefined;
  MyDay: undefined;
  Instructions: undefined;
  Notifee: undefined;
  MyGotchi: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

function HomeScreen({navigation}: Props) {
  /*   useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Do nothing or exit the app if you want to
        // return true if the event has been handled, false otherwise
        return true;
      };

      // Add event listener for hardware back button
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      // Cleanup the event listener
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  ); */

  return (
    <>
      <ViewContainer>
        <Title text="Welcome to EDU-GOTCHI" />
        <LgButton text="My day" onPress={() => navigation.navigate('MyDay')} />
        <LgButton
          text="My EDU-GOTCHI"
          onPress={() => navigation.navigate('MyGotchi')}
        />
        <LgButton
          text="Instructions"
          onPress={() => navigation.navigate('Instructions')}
        />
        <LgButton
          text="Notifee"
          onPress={() => navigation.navigate('Notifee')}
        />
      </ViewContainer>
    </>
  );
}

export default HomeScreen;
