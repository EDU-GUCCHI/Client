import React, { useState, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { s } from 'react-native-wind';
import { Text } from 'react-native';
import ViewContainer from '../components/ViewContainer';
import LgButton from '../components/LgButton';
import Title from '../components/Title';
import { View } from 'react-native';

type RootStackParamList = {
  AboutGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'AboutGotchi'>;

type Props = {
  navigation: NavigationProp;
};

// ... (previous imports and types)

function BeforeWeBeginScreen({ navigation }: Props) {
  return (
    <ViewContainer style={s`items-center justify-between h-full`}>
      <View style={s`flex-1 justify-center`}>
        <Title text="Innan vi börjar.." />
        <Text>{"Vi ber dig vänligen att ge appen tillåtelse för att skicka notifikationer. Detta för att EDU-Gotchi förlitar sig på dessa för att du som användare ska få en lärorik upplevelse"}</Text>
      </View>

      <View style={s`items-center mb-8`}>
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
      </View>
    </ViewContainer>
  );
}

export default BeforeWeBeginScreen;



