import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {s} from 'react-native-wind';

type UserInteractableEventProps = {
  navigation: any;
  eventTime: string;
  eventTitle: string;
  colors: string[]; // Array of colors for the gradient
  locations?: number[]; // Optional locations for the gradient colors
  useAngle?: boolean; // Optional boolean to use angle or not
  angle?: number; // Optional angle for the gradient direction
  angleCenter?: {x: number; y: number}; // Optional center for the gradient angle
};

function UserInteractableEvent({
  navigation,
  eventTime,
  eventTitle,
  colors,
  locations,
  useAngle,
  angle,
  angleCenter,
}: UserInteractableEventProps) {
  const handleNavigate = () => {
    navigation.navigate('AnswerEvent'); // Navigate to the 'AnswerEvent' screen
  };

  return (
    <TouchableOpacity
      onPress={handleNavigate}
      style={s`w-full items-center px-3 mb-3`}>
      <LinearGradient
        colors={colors}
        locations={locations}
        useAngle={useAngle}
        angle={angle}
        angleCenter={angleCenter}
        style={s`w-full px-3 rounded-lg items-center flex-row justify-between`}>
        <Text style={s`text-xl text-black font-bold text-center`}>
          {'🕑 '}
          {eventTime}
          {/* GET TIME */}
        </Text>

        <Text style={s`text-xl text-black font-bold py-4`}>
          {eventTitle}{/* GET EVENT INFO */}
        </Text>

        <Text style={s`text-black text-3xl mb-2`}>{'→'}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default UserInteractableEvent;