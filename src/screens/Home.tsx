import React from 'react';
import {Button, Text, Touchable, TouchableOpacity, View} from 'react-native';
import styles from '../styles/style.js';
import PushNotificationButton from '../components/PushNotificationButton';
import {StackNavigationProp} from '@react-navigation/stack';

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
      <Text style={styles.header_text}>Welcome to EDU-GOTCHI</Text>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.menu_button}
          onPress={() => {
            navigation.navigate('MyDay');
          }}>
          <Text style={styles.button_text}>My day</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menu_button}
          onPress={() => {
            navigation.navigate('Instructions');
          }}>
          <Text style={styles.button_text}>Instructions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menu_button}
          onPress={() => {
            navigation.navigate('MyGotchi');
          }}>
          <Text style={styles.button_text}>My EDU-GOTCHI</Text>
        </TouchableOpacity>

        <Button
          title="notifee"
          onPress={() => navigation.navigate('Notifee')}
        />
      </View>
    </>
  );
}

export default HomeScreen;
