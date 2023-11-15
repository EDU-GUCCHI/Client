import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {s} from 'react-native-wind';
import MultiSelectionButtons from '../components/MultiSelectionButtons';
import ViewContainer from '../components/ViewContainer';

type RootStackParamList = {
  CreateGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'CreateGotchi'>;

type Props = {
  navigation: NavigationProp;
};

function AnswerEventScreen() {
  return (
    <ViewContainer style={s`flex h-full items-center`}>
      <Text>Low bloodsugar while working out</Text>
      <MultiSelectionButtons />
    </ViewContainer>
  );
}
export default AnswerEventScreen;
