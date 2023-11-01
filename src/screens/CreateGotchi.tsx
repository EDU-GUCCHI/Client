import React, {useState} from 'react';
import {View} from 'react-native';
import {s} from 'react-native-wind';

import {ScenarioController} from '../utilities/logic/ScenarioController';
import {StackNavigationProp} from '@react-navigation/stack';

import Title from '../components/Title';
import InputField from '../components/InputField';
import LgButton from '../components/LgButton';
import ViewContainer from '../components/ViewContainer';

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

  return (
    <>
      <ViewContainer>
        <Title text="Create new EDU-GOTCHI" />
        <InputField
          placeholder="Name your gotchi..."
          value={gotchiName}
          onChangeText={setGotchiName}
        />
        <InputField
          placeholder="Class code..."
          value={classCode}
          onChangeText={setClassCode}
        />
        <LgButton
          text="Continue"
          onPress={() => {
            navigation.navigate('Home');
            new ScenarioController();
          }}
        />
      </ViewContainer>
    </>
  );
}

export default CreateGotchiScreen;
