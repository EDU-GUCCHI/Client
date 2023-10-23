import React from 'react';
import {

  Text,
  View,

  TouchableOpacity,
} from 'react-native';
import styles from '../styles/style.js';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  CreateGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'CreateGotchi'>;

type Props = {
  navigation: NavigationProp;
};

function TutorialScreen({navigation}: Props) {
  return (
    <View style={styles.container}>
      <Text> Tutorial </Text>
      <TouchableOpacity
        style={styles.continue_button}
        onPress={() => {
          navigation.navigate('CreateGotchi');
        }}>
        <Text style={styles.button_text}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TutorialScreen;
