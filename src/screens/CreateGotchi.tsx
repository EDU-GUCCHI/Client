import {useState} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import styles from '../styles/style.js';
import {ScenarioController} from '../utilities/logic/ScenarioController';
import {StackNavigationProp} from '@react-navigation/stack';

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
      <Text style={styles.header_text}>Create a new EDU-GOTCHI</Text>
      <View style={styles.container}>
        <View style={styles.input_view}>
          <TextInput
            style={styles.text_input}
            placeholder="Name you gotchi..."
            placeholderTextColor="#003f5c"
            onChangeText={gotchiName => setGotchiName(gotchiName)}
          />
        </View>
        <View style={styles.input_view}>
          <TextInput
            style={styles.text_input}
            placeholder="Class code..."
            placeholderTextColor="#003f5c"
            onChangeText={classCode => setClassCode(classCode)}
          />
        </View>

        <TouchableOpacity
          style={styles.continue_button}
          onPress={() => {
            navigation.navigate('Home');
            new ScenarioController(gotchiName, classCode); // change this. get with GUIController instead
          }}>
          <Text style={styles.button_text}>Continue</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default LoginScreen;
