import React from 'react';
import {Text, View} from 'react-native';
import styles from '../styles/style.js';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  MyGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'MyGotchi'>;

type Props = {
  navigation: NavigationProp;
};

function MyDayScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>My Gotchi</Text>
    </View>
  );
}

export default MyDayScreen;
