import React, { useState, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { s } from 'react-native-wind';
import {Text} from 'react-native'
import ViewContainer from '../components/ViewContainer';
import LgButton from '../components/LgButton';
import Title from '../components/Title';

type RootStackParamList = {
  AboutGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'AboutGotchi'>;

type Props = {
  navigation: NavigationProp;
};

function BeforeWeBeginScreen({ navigation }: Props) {
  return (
    <ViewContainer style={s`items-center justify-center h-full`}>
      <Title text="Innan vi börjar.."/>
      <Text>{"Vi ber dig vänligen att ge appen tillåtelse för att skicka notifikationer. Detta för att EDU-Gotchi förlitar sig på dessa för att du som användare ska få en lärorik upplevelse"}</Text>
      <LgButton
        text="Nästa"
        colors={['#70e0e1', '#6ca7e8']}
        locations={[0, 0.7]}
        useAngle={true}
        angle={25}
        angleCenter={{ x: 0.5, y: 0.5 }}
        onPress={() => {
          navigation.navigate('CreateGotchi');
        }}
      />
    </ViewContainer>
  );
}

export default BeforeWeBeginScreen;
