import React, {useState} from 'react';
import {View} from 'react-native';
import {s} from 'react-native-wind';
import { useRoute } from '@react-navigation/native';

import {ScenarioController} from '../utilities/logic/ScenarioController';
import {StackNavigationProp} from '@react-navigation/stack';

import Title from '../components/Title';
import InputField from '../components/InputField';
import LgButton from '../components/LgButton';
import ViewContainer from '../components/ViewContainer';
import { useScenarioController } from '../components/ScenarioControllerContext';

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

function CreateGotchiScreen({navigation}: Props) {
  const [gotchiName, setGotchiName] = useState('');
  const [classCode, setClassCode] = useState('');

  const controller = useScenarioController();

  return (
    <>
      <ViewContainer>
        <Title text="Create new EDU-GOTCHI" />
        <InputField
          placeholder="Name your gotchi..."
          value={gotchiName}
          onChangeText={setGotchiName}
          colors={['#E9F1F7', '#E0DDD5']}
          locations={[0, 1]}
          useAngle={true}
          angle={25}
          angleCenter={{x: 0.5, y: 0}}
        />
        <InputField
          placeholder="Class code..."
          value={classCode}
          onChangeText={setClassCode}
          colors={['#E9F1F7', '#E0DDD5']}
          locations={[0, 1]}
          useAngle={true}
          angle={25}
          angleCenter={{x: 0.5, y: 0}}
        />
        <LgButton
          text="Continue"
          colors={['#6ca7e8', '#70e0e1']}
          locations={[0, 0.7]}
          useAngle={true}
          angle={25}
          angleCenter={{x: 0.5, y: 0.3}}
          onPress={() => {
            navigation.navigate('Home');
          //new ScenarioController(gotchiName, classCode); // change this. get with GUIController instead
          controller.initialize();
          }}
        />
      </ViewContainer>
    </>
  );
}

export default CreateGotchiScreen;
