import React from 'react';
import {Text, View} from 'react-native';
import styles from '../styles/style.js';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Instructions: undefined;
}

type NavigationProp = StackNavigationProp<RootStackParamList, 'Instructions'>;

type Props = {
  navigation: NavigationProp;
}

function MyDayScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Instructions</Text>
    </View>
  );
}

export default MyDayScreen;
