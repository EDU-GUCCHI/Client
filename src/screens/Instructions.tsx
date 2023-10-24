import React from 'react';
import styles from '../styles/style.js';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import {Text, View, TouchableOpacity} from 'react-native';

type RootStackParamList = {
  CreateGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'CreateGotchi'>;

type Props = {
  navigation: NavigationProp;
};

function TutorialScreen({navigation}: Props) {
  return (
    <View style={styles.mainContainer}>
      {/* TutorialScreen */}
      <View style={TutorialScreenStyles.statContainerLight}>
        <Text> Här kommer en tutorial... </Text>
      </View>
    </View>
  );
}

export default TutorialScreen;



const neonRed = '#FF2C55';
const neonBlue = '#0AD4FA';
const neonGreen = '#02E67E';
const neonPink = '#FF66D9';
const neonLight = '#E9F1F7';
const neonDark = '#1E2532';

const TutorialScreenStyles = StyleSheet.create({
  statContainerLight: {
    flex: 1,
    backgroundColor: neonLight,
    padding: 20,
    margin: 20,
    borderRadius: 20,
  }
})
