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

function TutorialScreen({navigation}: Props) {
  return (
    <View style={s`flex h-full items-center justify-center bg-coolGray-100`}>
      <Text> Tutorial </Text>
      <TouchableOpacity
        style={s`w-72 h-12 mt-3 rounded-md items-center justify-center bg-violet-900`}
        onPress={() => {
          navigation.navigate('CreateGotchi');
        }}>
        <Text style={s`text-white text-md font-bold`}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TutorialScreen;
