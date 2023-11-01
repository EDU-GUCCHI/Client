import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import { s } from 'react-native-wind';

import Button from '../components/Button';
import Title from '../components/Title'

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
      <View style={s`flex items-center justify-center bg-coolGray-100`}>
      <Title text="Welcome to EDU-GOTCHI" />
        <Button
          text="My day"
          onPress={() => navigation.navigate('MyDay')}
        />
        <Button
          text="My EDU-GOTCHI"
          onPress={() => navigation.navigate('MyGotchi')}
        />
        <Button
          text="Instructions"
          onPress={() => navigation.navigate('Instructions')}
        />
        <Button
          text="Notifee"
          onPress={() => navigation.navigate('Notifee')}
        />
      </View>
    </>
  );
}

export default HomeScreen;
