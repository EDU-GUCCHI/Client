import React from 'react';
import {Text, View} from 'react-native';
import styles from '../styles/style.js';
import {StackNavigationProp} from '@react-navigation/stack';


type RootStackParamList = {
  MyDay: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'MyDay'>;

type Props = {
  navigation: NavigationProp;
};

function MyDayScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>My Day</Text>
    </View>
  );
}

export default MyDayScreen;
