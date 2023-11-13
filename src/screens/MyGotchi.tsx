import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {s} from 'react-native-wind';
import MyGotchiStatus from '../components/MyGotchiComponents/MyGotchiStatus';
import {useScenarioController} from '../components/ScenarioControllerContext';
import ViewContainer from '../components/ViewContainer';

type RootStackParamList = {
  MyGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'MyGotchi'>;

type Props = {
  navigation: NavigationProp;
};

const water = '2 L';
const heartRate = '80 bpm';
const sleep = '8h 24m';

function MyGotchiScreen({navigation}: Props) {
  const controller = useScenarioController(); // retreive Controller instance
  const [bloodSugar, setBloodSugar] = useState(
    controller.storage.person.bloodValue.toString(),
  ); // Default value
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
    <ViewContainer style={s`items-center justify-start h-full px-5 py-2`}>
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
    </ViewContainer>
  );
}
export default MyGotchiScreen;
