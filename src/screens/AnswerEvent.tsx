import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles/style.js';
import { StackNavigationProp } from '@react-navigation/stack';
import {s} from 'react-native-wind';

type RootStackParamList = {
  CreateGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'CreateGotchi'>;

type Props = {
  navigation: NavigationProp;
};

function AnswerEventScreen({navigation}: Props) {
  return (
    <View style={s`flex h-full items-center justify-center bg-coolGray-100`}>
      <Text> Answer Event, Lägg till dropdowns för alterntiv till symptom, behandling och orsak </Text>
    </View>
  );
}

export default AnswerEventScreen;