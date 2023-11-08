import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { s } from 'react-native-wind';


type MyDayEventProps = {
  navigation: any;
  eventTime: string;
  eventTitle: string;
  colors: string[]; // Array of colors for the gradient
  locations?: number[]; // Optional locations for the gradient colors
  useAngle?: boolean; // Optional boolean to use angle or not
  angle?: number; // Optional angle for the gradient direction
  angleCenter?: { x: number; y: number }; // Optional center for the gradient angle
};

function MyDayEvent({
  navigation,
  eventTime,
  eventTitle,
  colors,
  locations,
  useAngle,
  angle,
  angleCenter,
}: MyDayEventProps) {
  const handleNavigate = () => {
    navigation.navigate('AnswerEvent'); // Navigate to the 'AnswerEvent' screen
  };

  return (
    <TouchableOpacity onPress={handleNavigate} style={s`w-11/12 rounded-lg items-center flex-row`}>
      <LinearGradient
        colors={colors}
        locations={locations}
        useAngle={useAngle}
        angle={angle}
        angleCenter={angleCenter}
        style={s`flex mb-5 py-5 rounded-lg items-center flex-row`}>
        <Text style={s`text-2xl font-bold text-center text-warmGray-700`}>
          {'🕑 '}
          {eventTime} {/* GET TIME */}
        </Text>

        <Text style={s`text-md font-bold text-warmGray-800 py-4`}>
          {eventTitle} {/* GET EVENT INFO */}
        </Text>

        <View style={s`w-7 rounded-lg justify-center items-center`}>
          <Text style={s`text-black text-2xl`}>{'→'}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default MyDayEvent;



