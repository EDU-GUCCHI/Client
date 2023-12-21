import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {s} from 'react-native-wind';

import Svg, {Path, SvgXml} from 'react-native-svg';

import BackIcon from '../icons/BackIcon';

const BackButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <View style={s`absolute top-0 left-0 pl-4 p-6`}>
      <TouchableOpacity onPress={handlePress}>
        <BackIcon />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
