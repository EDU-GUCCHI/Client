import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {s} from 'react-native-wind';

const BackButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <View style={s`absolute top-0 left-0 pl-4 p-6`}>
      <TouchableOpacity onPress={handlePress}>
        <Text style={s`text-4xl font-bold`}>{'←'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
