import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { s } from 'react-native-wind';

type UserInteractableEventProps = {
  navigation: any;
  eventTime: string;
  eventTitle: string;
  eventData: ParsedEvent; // Make sure ParsedEvent is correctly defined and imported
  colors: string[];
  locations?: number[];
  useAngle?: boolean;
  angle?: number;
  angleCenter?: {x: number; y: number};
};

function UserInteractableEvent({
  navigation,
  eventTime,
  eventTitle,
  eventData, // Include eventData here
  colors,
  locations,
  useAngle,
  angle,
  angleCenter,
}: UserInteractableEventProps) {
  const handleNavigate = () => {
    navigation.navigate('AnswerEvent', {
      event: eventData,
      eventId: eventData.id,
    });
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
        </Text>

        <Text style={s`text-xl text-black font-bold py-4`}>{eventTitle}</Text>

        <Text style={s`text-black text-3xl mb-2`}>{'→'}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default UserInteractableEvent;
