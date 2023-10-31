import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {s} from 'react-native-wind';

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
      <View style={s`flex h-full items-center justify-center bg-coolGray-100`}>
        <Text style={s`text-5xl font-extrabold text-blue-900`}>
          Welcome to EDU-GOTCHI
        </Text>
        <TouchableOpacity
          style={s`w-72 h-12 mt-16 rounded-md items-center justify-center bg-violet-900`}
          onPress={() => {
            navigation.navigate('MyDay');
          }}>
          <Text style={s`text-white text-md font-bold`}>My day</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={s`w-72 h-12 mt-3 rounded-md items-center justify-center bg-violet-900`}
          onPress={() => {
            navigation.navigate('MyGotchi');
          }}>
          <Text style={s`text-white text-md font-bold`}>My EDU-GOTCHI</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={s`w-72 h-12 mt-3 rounded-md items-center justify-center bg-violet-900`}
          onPress={() => {
            navigation.navigate('Instructions');
          }}>
          <Text style={s`text-white text-md font-bold`}>Instructions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={s`w-72 h-12 mt-10 rounded-md items-center justify-center bg-violet-900`}
          onPress={() => navigation.navigate('Notifee')}>
          <Text style={s`text-white text-md font-bold`}>Notifee</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default HomeScreen;
