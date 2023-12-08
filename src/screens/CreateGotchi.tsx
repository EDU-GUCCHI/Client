import React, { useEffect, useState } from 'react';
import { s } from 'react-native-wind';

import { StackNavigationProp } from '@react-navigation/stack';

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

const data = [
  { key: '1', value: 'Malmö Universitet', disabled: true },
  { key: '2', value: 'Göteborgs Universitet' },
]

function CreateGotchiScreen({ navigation }: Props) {
  const [gotchiName, setGotchiName] = useState('');
  const [classCode, setClassCode] = useState('');
  const [institutionName, setInstitutionName] = useState('');

  const controller = useScenarioController();
  const GUIController = controller.GUIController;

  useEffect(() => {
    if (gotchiName !== '') {
      GUIController.gotchisName = gotchiName;
    }
  }, [gotchiName, GUIController]);

  return (
    <>
      <ViewContainer style={s`items-center justify-center h-full`}>
        <Title text="Skapa en ny EDU-GOTCHI" />
        <InputField
          placeholder="Namnge din gotchi..."
          value={gotchiName}
          onChangeText={setGotchiName}
          colors={['#E9F1F7', '#E0DDD5']}
          locations={[0, 1]}
          useAngle={true}
          angle={25}
          angleCenter={{ x: 0.5, y: 0 }}
        />
        <InputField
          placeholder="Institution..."
          value={institutionName}
          onChangeText={setInstitutionName}
          colors={['#E9F1F7', '#E0DDD5']}
          locations={[0, 1]}
          useAngle={true}
          angle={25}
          angleCenter={{ x: 0.5, y: 0 }}
        />
        <InputField
          placeholder="Klasskod..."
          value={classCode}
          onChangeText={setClassCode}
          colors={['#E9F1F7', '#E0DDD5']}
          locations={[0, 1]}
          useAngle={true}
          angle={25}
          angleCenter={{ x: 0.5, y: 0 }}
        />
        <LgButton
          text="Nästa"
          colors={['#6ca7e8', '#70e0e1']}
          locations={[0, 0.7]}
          useAngle={true}
          angle={25}
          angleCenter={{ x: 0.5, y: 0.3 }}
          onPress={() => {
            navigation.navigate('Home');
            controller.checkPermissions(); // start controller flow
          }}
        />
      </ViewContainer>
    </>
  );
}

export default CreateGotchiScreen;
