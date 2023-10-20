import React from 'react';
import {Button, Text, View, BackHandler, Touchable, TouchableOpacity} from 'react-native';
import styles from '../styles/style.js';
import {StackNavigationProp} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  CreateGotchi: undefined;
  Instructions: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateGotchi'
    >;

type Props = {
  navigation: HomeScreenNavigationProp;
};

function TutorialScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
          <Text> Tutorial </Text>
          <TouchableOpacity          style={styles.continue_button}
          onPress={() => {
            navigation.navigate('CreateGotchi');
          }}>
            <Text style={styles.white_text}>Next</Text>
          </TouchableOpacity>
    </View>
  );
}

export default TutorialScreen;
