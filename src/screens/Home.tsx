import React from 'react';
import { Button, Text, View, PermissionsAndroid } from 'react-native';
import styles from '../styles/style.js';
import PushNotificationButton from '../components/PushNotificationButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScenarioController } from '../utilities/logic/ScenarioController'

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Notifee: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to EDU-GOTCHI</Text>
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate('Login');
          new ScenarioController(); // start main controller here
        }}
      />
      <Button title="notifee" onPress={() => navigation.navigate('Notifee')} />
      <PushNotificationButton />
    </View>
  );
}

export default HomeScreen;
