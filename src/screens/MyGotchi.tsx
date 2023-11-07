import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {s} from 'react-native-wind';
import HeartRate from '../components/MyGotchiComponents/HeartRate';
import { useScenarioController } from '../components/ScenarioControllerContext';

type RootStackParamList = {
  MyGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'MyGotchi'>;

type Props = {
  navigation: NavigationProp;
};

const water = '2 L';

function MyGotchiScreen({ navigation }: Props) {
  const controller = useScenarioController();
  const [bloodSugar, setBloodSugar] = useState(controller.storage.person.bloodValue); // Default value
  const guiController = controller.GUIController;

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
    <View style={s`flex p-7 bg-coolGray-100 h-full`}>
      {/* Profile Info */}
      <View style={s`items-center my-5`}>
        <View style={s`bg-cyan-300 p-5 rounded-full`}>
          <Text style={s`text-6xl text-black`}>😉</Text>
        </View>
        <Text style={s`text-black font-semibold text-4xl mt-4`}>
          Alex-GOTCHI
        </Text>
        <Text style={s`text-black my-2.5`}>
          Young adult • Height 184 cm • Weight 65 kg
        </Text>
      </View>
      {/* Stats */}
      <View style={s`flex-row justify-between`}>
        <HeartRate bpmText={bloodSugar} icon="🩸" />

        <HeartRate bpmText={water} icon="🕑" />
      </View>
      <View style={s`flex-row justify-between`}>
        <View style={s`flex-1 bg-pink-300 p-5 m-2.5 rounded-lg`}>
          <Text style={s`text-black text-3xl`}>1,7 L</Text>
          <Text style={s`text-black pt-4 text-4xl text-center`}>💧</Text>
        </View>
        <View style={s`flex-1 bg-gray-300 p-5 m-2.5 rounded-lg`}>
          <Text style={s`text-black text-3xl`}>8h 24m</Text>
          <Text style={s`text-black pt-4 text-4xl text-center`}>🛌</Text>
        </View>
      </View>

      {/* Footer */}
      {/*       <View style={s`flex-row justify-around mt-auto`}>
        <TouchableOpacity>
          <Text style={s`text-white`}>Summary</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={s`text-white`}>Stats</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={s`text-white`}>Profile</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}
export default MyGotchiScreen;
