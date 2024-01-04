import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {s} from 'react-native-wind';

type RootStackParamList = {
  Home: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: NavigationProp;
};

function ConditionsScreen({navigation}: Props) {
  return (
    <View style={s`flex h-full items-center justify-center bg-coolGray-100`}>
      {/* TutorialScreen */}
      <View style={s`flex p-5 m-3 rounded-lg bg-warmGray-200 h-80`}>
        <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
          {' '}
          Här ska det finnas info...{' '}
        </Text>
      </View>
    </View>
  );
}

export default ConditionsScreen;
