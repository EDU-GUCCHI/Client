import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { s } from 'react-native-wind';
import MyGotchiStatus from '../components/MyGotchiComponents/MyGotchiStatus';
import { useScenarioController } from '../components/ScenarioControllerContext';
import ViewContainer from '../components/ViewContainer';
import AttributeButton from '../components/MyGotchiComponents/AttributeButton';
import LgButton from '../components/LgButton';

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
  const controller = useScenarioController();
  const guiController = controller.GUIController;
  const [bloodSugar, setBloodSugar] = useState(
    guiController.currentBloodValue.toFixed(1).toString(),
  );

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
    <ViewContainer style={s`flex-1 items-center justify-start px-5 py-2 bg-white`}>
      {/* Profile Info */}
      <View style={s`items-center my-5`}>
        <View style={s`bg-cyan-300 p-4 rounded-full`}>
          <Text style={s`text-4xl text-black`}>😇</Text>
        </View>
        <Text style={s`text-black font-semibold text-2xl`}>
          {controller.storage.person.name}-GOTCHI
        </Text>
      </View>

      {/* Stats */}
      <View style={s`flex-row justify-between w-full`}>
        <MyGotchiStatus
          style={s`flex-1 bg-blue-300 p-4 m-2 rounded-lg`}
          statusText={bloodSugar}
          statusIcon="🩸"
        />
        <MyGotchiStatus
          style={s`flex-1 bg-emerald-300 p-4 m-2 rounded-lg`}
          statusText={heartRate}
          statusIcon="💓"
        />
      </View>
      <View style={s`flex-row justify-between w-full`}>
        <MyGotchiStatus
          style={s`flex-1 bg-pink-300 p-4 m-2 rounded-lg`}
          statusText={water}
          statusIcon="💧"
        />
        <MyGotchiStatus
          style={s`flex-1 bg-gray-300 p-4 m-2 rounded-lg`}
          statusText={sleep}
          statusIcon="🛌"
        />
      </View>

      {/* Spacer to adjust the button position */}
      <View style={s`flex-0.5`} />

      {/* Footer */}
      <TouchableOpacity
        style={s`p-2 bg-warmGray-500 rounded-lg`}
        onPress={() => navigation.navigate('AboutGotchi')}>
        <Text style={s`text-white text-lg`}>Om {controller.storage.person.name}</Text>
      </TouchableOpacity>
    </ViewContainer>
  );
}

export default MyGotchiScreen;


