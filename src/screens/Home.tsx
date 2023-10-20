import React from 'react';
import {Button, Text, View, BackHandler} from 'react-native';
import styles from '../styles/style.js';
import {StackNavigationProp} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Notifee: undefined;
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
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to EDU-GOTCHI</Text>
      <Button
        title=""
        onPress={() => {
          navigation.navigate('Login');
        }}
      />
      <Button title="notifee" onPress={() => navigation.navigate('Notifee')} />
    </View>
  );
}

export default HomeScreen;
