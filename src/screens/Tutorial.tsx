import React from 'react';
import {View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {s} from 'react-native-wind';

import LgButton from '../components/LgButton';
import Title from '../components/Title';
import ViewContainer from '../components/ViewContainer'

type RootStackParamList = {
  CreateGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'CreateGotchi'>;

type Props = {
  navigation: NavigationProp;
};

function TutorialScreen({navigation}: Props) {
  return (
    <ViewContainer>
      <Title text="Tutorial" />
      <LgButton
        text="Next"
        onPress={() => {
          navigation.navigate('CreateGotchi');
        }}
      />
    </ViewContainer>
  );
}

export default TutorialScreen;
