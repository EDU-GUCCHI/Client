import React, { } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { s } from 'react-native-wind';
import { View } from 'react-native';
import { useScenarioController } from '../components/ScenarioControllerContext';

import LgButton from '../components/LgButton';
import Title from '../components/Title';
import ViewContainer from '../components/ViewContainer';
import LoadingSpinner from '../components/LoadingSpinner';

type RootStackParamList = {
  Home: undefined;
  MyDay: undefined;
  Instructions: undefined;
  Notifee: undefined;
  MyGotchi: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

function HomeScreen({ navigation }: Props) {
  const { isLoading } = useScenarioController();

  // Add a console log to check the value of isLoading
  console.log('isLoading in HomeScreen:', isLoading);

  return (
    <ViewContainer style={s`flex-1 justify-center items-center mt-0 mb-0`}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <View style={s`flex-1 justify-center mt-20`}>
            <Title text="Välkommen till EDU-GOTCHI" />
          </View>

          <View style={s`flex-1 items-center`}>
            <LgButton
              text="Min dag"
              colors={['#6ca7e8', '#70e0e1']}
              locations={[0, 0.7]}
              useAngle={true}
              angle={25}
              angleCenter={{ x: 0.5, y: 1 }}
              onPress={() => navigation.navigate('MyDay')}
            />
            <LgButton
              text="Min EDU-GOTCHI"
              colors={['#6ca7e8', '#70e0e1']}
              locations={[0, 0.8]}
              useAngle={true}
              angle={25}
              angleCenter={{ x: 0.5, y: 0.6 }}
              onPress={() => navigation.navigate('MyGotchi')}
            />
            <LgButton
              text="Instruktioner"
              colors={['#6ca7e8', '#70e0e1']}
              locations={[0, 0.9]}
              useAngle={true}
              angle={25}
              angleCenter={{ x: 0.5, y: 0.4 }}
              onPress={() => navigation.navigate('Instructions')}
            />
          </View>
        </>
      )}
    </ViewContainer>
  );
}

export default HomeScreen;
