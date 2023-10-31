import * as React from 'react';
import styles from '../styles/style.js';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import {Text, View, TouchableOpacity} from 'react-native';
import {s} from 'react-native-wind';

type RootStackParamList = {
  CreateGotchi: undefined;
  MyDay: undefined;
  MyGotchi: undefined;
  Notifee: undefined;
  Tutorial: undefined;
  AnswerEvent: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'CreateGotchi'>;

type Props = {
  navigation: NavigationProp;
};

function MyDayEvent({ navigation }: {navigation: any}) {
  const handleNavigate = () => {
    navigation.navigate('AnswerEvent'); // Navigate to the 'AnswerEvent' screen
  };

  return (
    <View>
      <View style={s`flex p-5 m-3 rounded-lg bg-warmGray-200 shadow-lg`}>
      <Text style={s`text-2xl font-bold text-center text-warmGray-700 `}>
        🕑 {/* GET TIME */}
      </Text>
      <Text style={s`text-lg text-center font-bold text-warmGray-800 my-4`}>
        {/* GET EVENT INFO */}
      </Text>
      <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
        Symptoms:{' '}
        <Text style={s`text-md font-normal text-warmGray-800 my-1`}>
          {/* GET SYMPTOMS CHOICES */}
        </Text>
      </Text>
      <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
        Treatment:{' '}
        <Text style={s`text-md font-normal text-warmGray-800 my-1`}>
          {/* GET TREATMENT CHOICES */}
        </Text>
      </Text>
      <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
        Caused by:{' '}
        <Text style={s`text-md font-normal text-warmGray-800 my-1`}>
          {/* GET CAUSED BY CHOICES */}
        </Text>
      </Text>
      <TouchableOpacity
        style={s`p-3 bg-red-400 rounded-lg w-32 justify-center items-center self-end`}
        onPress={handleNavigate} // onPress event 
      >
        <Text>Answer event</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
  };

export default MyDayEvent;

