import React from 'react';
import styles from '../styles/style.js';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import { Text, View, TouchableOpacity } from 'react-native';
import {s} from 'react-native-wind';


type RootStackParamList = {
  CreateGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'CreateGotchi'>;

type Props = {
  navigation: NavigationProp;
};

function TutorialScreen({navigation}: Props) {
  return (
    <View style={s`flex h-full items-center justify-center bg-coolGray-100`}>
      {/* TutorialScreen */}
      <View style={s`flex p-5 m-3 rounded-lg bg-warmGray-200 h-80`}>
        <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
          {' '}
          Här kommer en tutorial...{' '}
        </Text>
      </View>
    </View>
  );
}

export default TutorialScreen;