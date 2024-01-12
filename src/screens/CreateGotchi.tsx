import React, { useEffect, useState } from 'react';
import { s } from 'react-native-wind';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { StackNavigationProp } from '@react-navigation/stack';

import { useScenarioController } from '../components/ScenarioControllerContext';
import Title from '../components/Title';
import InputField from '../components/InputField';
import LgButton from '../components/LgButton';
import ViewContainer from '../components/ViewContainer';
import BackButton from '../components/BackButton';

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



function CreateGotchiScreen({ navigation }: Props) {

  const [gotchiName, setGotchiName] = useState('');
  const [classCode, setClassCode] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
      {label: 'Göteborgs Universitet', value: 'banana'},
      {label: 'Malmö Universitet', value: 'apple'}
  ]);

  const { GUIController, checkPermissions } = useScenarioController(); // Destructure GUIController here

  useEffect(() => {
    if (gotchiName !== '') {
      GUIController.gotchisName = gotchiName;
    }
  }, [gotchiName, GUIController]);

  /**
   * Example API-call which we couldn't get working due to use-states being what they are. 
   */
  /*
  useEffect(() => {
    fetch('http://192.168.0.1:8080/api/institution', {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setData(data);
        setSelectedValue(data[0].insitutionID);
        setSelectedValue(data[1].institutionName)
      })
      .catch(error => console.error('API Error:', error));
  }, []);
  */

  return (
    <>
      <ViewContainer style={s`items-center justify-between h-full`}>
        <BackButton />
        <View style={s`flex-1 justify-center items-center`}>
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
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={'Välj Institution'}
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
        </View>

        <View style={s`items-center mb-8`}>
          <LgButton
            text="Nästa"
            colors={['#6ca7e8', '#70e0e1']}
            locations={[0, 0.7]}
            useAngle={true}
            angle={25}
            angleCenter={{ x: 0.5, y: 0.3 }}
            onPress={() => {
              navigation.navigate('Home');
              checkPermissions(); // start controller flow
            }}
          />
        </View>
      </ViewContainer>
    </>
  );
}
export default CreateGotchiScreen;
