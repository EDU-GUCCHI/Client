import {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {ScenarioController} from '../utilities/logic/ScenarioController';
import {StackNavigationProp} from '@react-navigation/stack';
import {s} from 'react-native-wind';

type RootStackParamList = {
  Home: undefined;
  CreateGotchi: undefined;
  Instructions: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateGotchi'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

function sendData() {
  const data = {
    //gotchiName: gotchiName,
    //classCode: classCode,
  };
  fetch('https://edugotchi-api.herokuapp.com/create-gotchi', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

function LoginScreen({navigation}: Props) {
  const [gotchiName, setGotchiName] = useState('');
  const [classCode, setClassCode] = useState('');

  return (
    <>
      <View style={s`flex h-full items-center justify-center bg-coolGray-100`}>
        <Text style={s`text-5xl font-extrabold text-blue-900`}>
          Create a new EDU-GOTCHI
        </Text>
        <View
          style={s`bg-warmGray-300 border-2 border-warmGray-400 w-72 rounded-md mb-5 mt-24`}>
          <TextInput
            style={s`flex px-4`}
            placeholder="Name your gotchi..."
            placeholderTextColor="#003f5c"
            onChangeText={gotchiName => setGotchiName(gotchiName)}
          />
        </View>
        <View
          style={s`bg-warmGray-300 border-2 border-warmGray-400 w-72 rounded-md mb-5`}>
          <TextInput
            style={s`flex px-4`}
            placeholder="Class code..."
            placeholderTextColor="#003f5c"
            onChangeText={classCode => setClassCode(classCode)}
          />
        </View>

        <TouchableOpacity
          style={s`w-72 h-12 mt-3 rounded-md items-center justify-center bg-violet-900`}
          onPress={() => {
            navigation.navigate('Home');
            new ScenarioController();
          }}>
          <Text style={s`text-white text-md font-bold`}>Continue</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default LoginScreen;
