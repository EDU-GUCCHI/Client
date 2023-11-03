import React from 'react';
import {TextInput, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {s} from 'react-native-wind';

type HeartRateProps = {
  bpmText: string;
};

const HeartRate = ({bpmText}: HeartRateProps) => (
  <View style={s`flex-1 bg-emerald-300 p-5 m-2.5 rounded-lg`}>
    <Text style={s`text-black text-3xl`}>{bpmText}</Text>
    <Text style={s`text-black pt-4 text-4xl text-center`}>❤️</Text>
  </View>
);

export default HeartRate