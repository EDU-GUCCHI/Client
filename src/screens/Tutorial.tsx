import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { s } from 'react-native-wind';
import MyGotchiStatus from '../components/MyGotchiComponents/MyGotchiStatus';
import { useScenarioController } from '../components/ScenarioControllerContext';
import ViewContainer from '../components/ViewContainer';
import AttributeButton from '../components/MyGotchiComponents/AttributeButton';
import LgButton from '../components/LgButton';
import Title from '../components/Title';

type RootStackParamList = {
  AboutGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'AboutGotchi'>;

type Props = {
  navigation: NavigationProp;
};

function TutorialScreen({ navigation }: Props) {
  return (
    <ViewContainer style={s`items-center justify-between h-full pb-8`}>
      <View style={s`mt-20 pt-20`}>
        {/* Adjusted margin-top to move down the header */}
        <Title text="Introduktion" />
      </View>

      <View style={s`justify-bottom mb-20`}>
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

export default TutorialScreen;




