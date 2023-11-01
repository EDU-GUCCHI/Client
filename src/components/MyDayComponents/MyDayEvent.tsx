import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {s} from 'react-native-wind';

type MyDayEventProps = {
  eventTime: string;
  eventTitle: string;
  eventTreatment: string;
  eventSymptom: string;
  eventCause: string;
};

function MyDayEvent({
  eventTime,
  eventTitle,
  eventTreatment,
  eventSymptom,
  eventCause,
}: MyDayEventProps) {
  return (
    <>
      <View style={s`flex p-8 m-3 rounded-lg bg-warmGray-200`}>
        <Text style={s`text-2xl font-bold text-center text-warmGray-700`}>
          {'🕑 '}
          {eventTime} {/* GET TIME */}
        </Text>
        <Text style={s`text-lg font-bold text-warmGray-800 my-4`}>
          {eventTitle} {/* GET EVENT INFO */}
        </Text>
        <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
          Symptoms:
          <Text style={s`text-md font-normal text-warmGray-800 my-1`}>
            {' '}
            {eventSymptom} {/* GET SYMPTOMS CHOICES */}
          </Text>
        </Text>
        <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
          Treatment:
          <Text style={s`text-md font-normal text-warmGray-800 my-1`}>
            {' '}
            {eventTreatment} {/* GET TREATMENT CHOICES */}
          </Text>
        </Text>
        <Text style={s`text-md font-bold text-warmGray-800 my-1`}>
          Caused by:
          <Text style={s`text-md font-normal text-warmGray-800 my-1`}>
            {' '}
            {eventCause} {/* GET CAUSED BY CHOICES */}
          </Text>
        </Text>
        <TouchableOpacity
          style={s`p-3 bg-red-400 rounded-lg w-32 justify-center items-center self-end`}>
          <Text>Answer event</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default MyDayEvent;
