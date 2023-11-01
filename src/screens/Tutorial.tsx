import React from 'react';
import {View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {s} from 'react-native-wind';

import Button from '../components/Button';
import Title from '../components/Title';

type RootStackParamList = {
  CreateGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'CreateGotchi'>;

type Props = {
  navigation: NavigationProp;
};

function TutorialScreen({navigation}: Props) {
  return (
    <View style={s`flex items-center justify-center bg-coolGray-100`}>
      <Title text="Tutorial" />
      <Button
        text="Next"
        onPress={() => {
          navigation.navigate('CreateGotchi');
        }}
      />
    </View>
  );
}

export default TutorialScreen;
