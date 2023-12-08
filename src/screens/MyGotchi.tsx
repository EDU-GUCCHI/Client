import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { s } from 'react-native-wind';
import MyGotchiStatus from '../components/MyGotchiComponents/MyGotchiStatus';
import { useScenarioController } from '../components/ScenarioControllerContext';
import ViewContainer from '../components/ViewContainer';
import AttributeButton from '../components/MyGotchiComponents/AttributeButton';

type RootStackParamList = {
  AboutGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'AboutGotchi'>;

type Props = {
  navigation: NavigationProp;
};

const water = '2 L';
const heartRate = '80 bpm';
const sleep = '8h 24m';

function MyGotchiScreen({ navigation }: Props) {
  const controller = useScenarioController(); // retreive Controller instance
  const guiController = controller.GUIController;
  const [bloodSugar, setBloodSugar] = useState(
    controller.storage.person.bloodValue.toFixed(1).toString(),
  ); // Default value

  const updateBloodSugar = (newBloodSugar: string) => {
    setBloodSugar(newBloodSugar);
  };

  useEffect(() => {
    const unsubscribe = guiController.subscribeToBloodSugar(updateBloodSugar);
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ViewContainer style={s`items-center justify-start h-full px-5 py-2`}>
      {/* Profile Info */}
      <View style={s`items-center my-5`}>
        <View style={s`bg-cyan-300 p-5 rounded-full`}>
          <Text style={s`text-6xl text-black`}>😇</Text>
        </View>
        <Text style={s`text-black font-semibold text-4xl`}>
          {controller.storage.person.name}
          {'-GOTCHI'}
        </Text>
        <View style={s`flex-row justify-center w-32 my-2`}>
          <Text style={s`text-lg`}>
            {controller.storage.person.ageStringRepresentation()}
          </Text>
          <Text style={s`mx-2 text-lg`}>{'•'}</Text>
          <Text style={s`text-lg`}>
            {controller.storage.person.genderStringRepresentation()}
          </Text>
        </View>
      </View>

      {/* Stats */}
      <View style={s`flex-row justify-between`}>
        <MyGotchiStatus
          style={s`flex-1 bg-blue-300 p-5 m-2.5 rounded-lg`}
          statusText={bloodSugar}
          statusIcon="🩸"
        />
        <MyGotchiStatus
          style={s`flex-1 bg-emerald-300 p-5 m-2.5 rounded-lg`}
          statusText={heartRate}
          statusIcon="💓"
        />
      </View>
      <View style={s`flex-row justify-between`}>
        <MyGotchiStatus
          style={s`flex-1 bg-pink-300 p-5 m-2.5 rounded-lg`}
          statusText={water}
          statusIcon="💧"
        />
        <MyGotchiStatus
          style={s`flex-1 bg-gray-300 p-5 m-2.5 rounded-lg`}
          statusText={sleep}
          statusIcon="🛌"
        />
      </View>

      {/* Footer */}
      <View
        style={s`flex-row w-52 justify-around absolute bottom-3 bg-warmGray-500 rounded-lg`}>
        <TouchableOpacity
          style={s`p-2`}
          onPress={() => navigation.navigate('AboutGotchi')}>
          <Text style={s`text-white text-lg`}>
            Om {controller.storage.person.name}
          </Text>
        </TouchableOpacity>
      </View>
    </ViewContainer>
  );
}
export default MyGotchiScreen;
