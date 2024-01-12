import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { s } from 'react-native-wind';
import ViewContainer from '../components/ViewContainer';
import BackButton from '../components/BackButton';

type RootStackParamList = {
  CreateGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'CreateGotchi'>;

type Props = {
  navigation: NavigationProp;
};

function TutorialScreen({ navigation }: Props) {
  return (
    <ViewContainer
      style={s`flex h-full items-center justify-center bg-coolGray-100`}>
      <BackButton />

      {/* TutorialScreen */}
      <View style={s`p-3 border border-darkGray-300 rounded-lg w-80`}>
        <Text style={s`text-lg font-bold text-warmGray-800 my-2`}>
          Så funkar det
        </Text>
        <Text style={s`text-base text-warmGray-600`}>
          Under loppet av en vecka inom din kurs kommer du ta hand om en Gotchi som har Typ 1 Diabetes.{"\n"}
        </Text>
        <Text style={s`text-base text-warmGray-600`}>
          Din Gotchi kommer att leva sitt egna liv men kan hamna i situationer där hen behöver din hjälp med sitt blodsocker!{"\n"}
        </Text>
        <Text style={s`text-base text-warmGray-600`}>
          När din Gotchi behöver din hjälp skickar vi ut en push-notifikation. Under "Min Dag" kan du se
          ett händelseflöde som visar vad din Gotchi har haft för sig.{"\n"}
        </Text>
        <Text style={s`text-base text-warmGray-600`}>
          Den senaste raden innehåller ett formulär med handlingar du kan be din Gotchi att utföra. Dessa alternativ
          kan vara mer eller mindre relevanta beroende på situationen och kommer att återspegla hur din Gotchi mår framöver{"\n"}
        </Text>
        <Text style={s`text-base text-warmGray-600`}>
          Utöver detta formulär följer ett par till som hjälper dig att studera in ditt kursmaterial.{"\n"}
        </Text>
        <Text style={s`text-base text-warmGray-600`}>
          Lycka till!
        </Text>
      </View>
    </ViewContainer>
  );
}

export default TutorialScreen;
