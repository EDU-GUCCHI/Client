import React, {useState} from 'react';
import {View} from 'react-native';
import {s} from 'react-native-wind';

import {ScenarioController} from '../utilities/logic/ScenarioController';
import {StackNavigationProp} from '@react-navigation/stack';

import Title from '../components/Title';
import InputField from '../components/InputField';
import Button from '../components/Button';

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
      <View style={s`flex items-center justify-center bg-coolGray-100`}>
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
        <Button
          text="Continue"
          onPress={() => {
            navigation.navigate('Home');
            new ScenarioController();
          }}
        />
      </View>
    </>
  );
}

export default CreateGotchiScreen;
