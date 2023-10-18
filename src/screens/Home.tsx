import React from 'react';
import { Button, Text, View, PermissionsAndroid } from 'react-native';
import styles from '../styles/style.js';
import PushNotificationButton from '../components/PushNotificationButton';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
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
        title="send money home"
        onPress={() => {
          navigation.navigate('Details');
        }}
      />
      <Button title="notifee" onPress={() => navigation.navigate('Notifee')} />
      <PushNotificationButton />
    </View>
  );
}

export default HomeScreen;
