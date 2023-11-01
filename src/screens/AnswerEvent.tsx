import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {s} from 'react-native-wind';


type RootStackParamList = {
  CreateGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'CreateGotchi'>;

type Props = {
  navigation: NavigationProp;
};

function AnswerEventScreen() {
  return (
    <View style={s`flex h-full items-center justify-center bg-coolGray-100`}>
      <Text>AnswerEventScreen</Text>
      <Text>Dropdowns...</Text>
    </View>
  )
};
export default AnswerEventScreen;


