import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {s} from 'react-native-wind';

import LgButton from '../components/LgButton';
import MdButton from '../components/MdButton';
import SmButton from '../components/SmButton';
import Title from '../components/Title';
import ViewContainer from '../components/ViewContainer';

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

function HomeScreen({navigation}: Props) {
  /*   useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Do nothing or exit the app if you want to
        // return true if the event has been handled, false otherwise
        return true;
      };

      // Add event listener for hardware back button
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      // Cleanup the event listener
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  ); */

  return (
    <>
      <ViewContainer>
        <Title text="Welcome to EDU-GOTCHI" />
        <LgButton
          text="My day"
          colors={['#6ca7e8', '#70e0e1']}
          locations={[0, 0.7]}
          useAngle={true}
          angle={25}
          angleCenter={{x: 0.5, y: 1}}
          onPress={() => navigation.navigate('MyDay')}
        />
        <LgButton
          text="My EDU-GOTCHI"
          colors={['#6ca7e8', '#70e0e1']}
          locations={[0, 0.8]}
          useAngle={true}
          angle={25}
          angleCenter={{x: 0.5, y: 0.6}}
          onPress={() => navigation.navigate('MyGotchi')}
        />
        <LgButton
          text="Instructions"
          colors={['#6ca7e8', '#70e0e1']}
          locations={[0, 0.9]}
          useAngle={true}
          angle={25}
          angleCenter={{x: 0.5, y: 0.4}}
          onPress={() => navigation.navigate('Instructions')}
        />
        <MdButton
          text="MdButton"
          colors={['#6ca7e8', '#70e0e1']}
          locations={[0, 1]}
          useAngle={true}
          angle={25}
          angleCenter={{x: 0.5, y: 0}}
          onPress={() => navigation.navigate('Notifee')}
        />
        <SmButton
          text="Sm"
          colors={['#6ca7e8', '#70e0e1']}
          locations={[0, 1]}
          useAngle={true}
          angle={25}
          angleCenter={{x: 0.5, y: 0}}
          onPress={() => navigation.navigate('Notifee')}
        />
      </ViewContainer>
    </>
  );
}

export default HomeScreen;
