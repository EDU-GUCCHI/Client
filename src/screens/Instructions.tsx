import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {s} from 'react-native-wind';
import ViewContainer from '../components/ViewContainer';

type RootStackParamList = {
  CreateGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'CreateGotchi'>;

type Props = {
  navigation: NavigationProp;
};

function TutorialScreen({navigation}: Props) {
  return (
    <ViewContainer
      style={s`flex h-full items-center justify-center bg-coolGray-100`}>
      {/* TutorialScreen */}
      <View style={s`p-3 border border-darkGray-300 rounded-lg w-80`}>
        <Text style={s`text-lg font-bold text-warmGray-800 my-2`}>
          Så funkar det
        </Text>
        <Text style={s`text-base text-warmGray-600`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>
    </ViewContainer>
  );
}

export default TutorialScreen;
