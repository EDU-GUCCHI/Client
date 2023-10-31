import React from 'react';
import styles from '../styles/style.js';
import {StackNavigationProp} from '@react-navigation/stack';
import {StyleSheet} from 'react-native';
import {Text, View, TouchableOpacity} from 'react-native';
import {s} from 'react-native-wind';

type RootStackParamList = {
  CreateGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'CreateGotchi'>;

type Props = {
  navigation: NavigationProp;
};

function MyDayScreen({navigation}: Props) {
  return (
    <View style={s`flex bg-coolGray-100 h-full`}>
      <View style={s`flex p-5 m-3 mt-5 rounded-lg bg-warmGray-200 shadow-lg`}>
        <Text style={s`text-2xl font-bold text-center text-warmGray-700 `}>
          🕑 13:22
        </Text>
        <Text style={s`text-lg text-center font-bold text-warmGray-800 my-4`}>
          Increasingly rapid heartbeat while in the store
        </Text>
        <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
          Symptoms:{' '}
          <Text style={s`text-md font-normal text-warmGray-800 my-1`}>
            Sweating
          </Text>
        </Text>
        <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
          Treatment:{' '}
          <Text style={s`text-md font-normal text-warmGray-800 my-1`}>
            Eat a candy
          </Text>
        </Text>
        <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
          Caused by:{' '}
          <Text style={s`text-md font-normal text-warmGray-800 my-1`}>
            Missing a meal (lunch)
          </Text>
        </Text>
      </View>

      <View style={s`flex p-5 m-3 rounded-lg bg-warmGray-200`}>
        <Text style={s`text-2xl font-bold text-center text-warmGray-700`}>
          🕑 18:43
        </Text>
        <Text style={s`text-lg text-center font-bold text-warmGray-800 my-4`}>
          Low blood sugar while working out
        </Text>
        <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
          Symptoms:{' '}
          <Text style={s`text-md font-normal text-warmGray-800 my-1`}>
            Feeling dizzy
          </Text>
        </Text>
        <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
          Treatment:{' '}
          <Text style={s`text-md font-normal text-warmGray-800 my-1`}>
            Insulin shot
          </Text>
        </Text>
        <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
          Caused by:{' '}
          <Text style={s`text-md font-normal text-warmGray-800 my-1`}>
            Working out too hard
          </Text>
        </Text>
      </View>

      <View style={s`flex p-5 m-3 rounded-lg bg-warmGray-200`}>
        <Text style={s`text-2xl font-bold text-center text-warmGray-700`}>
          🕑{' '}
        </Text>
        <Text style={s`text-lg text-center font-bold text-warmGray-800 my-4`}>
          Title
        </Text>
        <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
          Symptoms:{' '}
          <Text style={s`text-md font-normal text-warmGray-800 my-1`}></Text>
        </Text>
        <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
          Treatment:{' '}
          <Text style={s`text-md font-normal text-warmGray-800 my-1`}></Text>
        </Text>
        <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
          Caused by:{' '}
          <Text style={s`text-md font-normal text-warmGray-800 my-1`}></Text>
        </Text>
      </View>

      <View style={s`flex p-5 m-3 rounded-lg bg-warmGray-200`}>
        <Text style={s`text-2xl font-bold text-center text-warmGray-700`}>
          🕑{' '}
        </Text>
        <Text style={s`text-lg text-center font-bold text-warmGray-800 my-4`}>
          Title
        </Text>
        <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
          Symptoms:{' '}
          <Text style={s`text-md font-normal text-warmGray-800 my-1`}></Text>
        </Text>
        <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
          Treatment:{' '}
          <Text style={s`text-md font-normal text-warmGray-800 my-1`}></Text>
        </Text>
        <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
          Caused by:{' '}
          <Text style={s`text-md font-normal text-warmGray-800 my-1`}></Text>
        </Text>
      </View>
    </View>
  );
}

export default MyDayScreen;

const neonRed = '#FF2C55';
const neonBlue = '#0AD4FA';
const neonGreen = '#02E67E';
const neonPink = '#FF66D9';
const neonLight = '#E9F1F7';
const neonDark = '#1E2532';

const MyDayScreenStyles = StyleSheet.create({
  statContainerLight: {
    flex: 1,
    backgroundColor: neonLight,
    padding: 20,
    margin: 15,
    borderRadius: 20,
  },
  eventText: {
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  eventInformation: {
    padding: 5,
  },
  eventSymptoms: {
    padding: 5,
  },
  eventTreatment: {
    padding: 5,
  },
  eventCause: {
    padding: 5,
  },
});
