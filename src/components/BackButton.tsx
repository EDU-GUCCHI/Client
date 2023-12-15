import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BackButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text>{'←'}</Text>
    </TouchableOpacity>
  );
};

export default BackButton;


