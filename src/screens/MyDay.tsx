import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, View, TouchableOpacity} from 'react-native';
import {s} from 'react-native-wind';

import MyDayEvent from '../components/MyDayEvent';

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
      <Text
        style={s`text-4xl text-center m-4 mb-1 text-warmGray-600 font-semibold`}>
        Tuesday
      </Text>
      <Text style={s`text-2xl text-center text-warmGray-600 font-semibold`}>
        {' '}
        31/10/2023
      </Text>

      <MyDayEvent />

      <View style={s`flex p-5 m-3 rounded-lg bg-warmGray-200 shadow-lg`}>
        <Text style={s`text-2xl font-bold text-center text-warmGray-700 `}>
          🕑 13:53 {/* GET TIME */}
        </Text>
        <Text style={s`text-lg text-center font-bold text-warmGray-800 my-4`}>
          Low blood sugar while working out{/* GET EVENT INFO OR TITLE*/}
        </Text>
        <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
          Symptoms:{' '}
          <Text style={s`text-md font-normal text-warmGray-800 my-1`}>
            Feeling dizzy {/* GET SYMPTOMS CHOICES */}
          </Text>
        </Text>
        <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
          Treatment:{' '}
          <Text style={s`text-md font-normal text-warmGray-800 my-1`}>
            Insulin shot {/* GET TREATMENT CHOICES */}
          </Text>
        </Text>
        <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
          Caused by:{' '}
          <Text style={s`text-md font-normal text-warmGray-800 my-1`}>
            Working out too hard {/* GET CAUSED BY CHOICES */}
          </Text>
        </Text>
        <TouchableOpacity
          style={s`p-3 bg-red-400 rounded-lg w-32 justify-center items-center self-end`}>
          <Text>Answer event</Text>
        </TouchableOpacity>
      </View>

      {/*       <View style={s`flex p-5 m-3 rounded-lg bg-warmGray-200`}>
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
      </View> */}
    </View>
  );
}

export default MyDayScreen;
