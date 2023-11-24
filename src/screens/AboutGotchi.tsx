import React, {useState, useEffect} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {s} from 'react-native-wind';
import {useScenarioController} from '../components/ScenarioControllerContext';
import ViewContainer from '../components/ViewContainer';
import AttributeButton from '../components/MyGotchiComponents/AttributeButton';

type RootStackParamList = {
  MyGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'MyGotchi'>;

type Props = {
  navigation: NavigationProp;
};

function AboutGotchiScreen({navigation}: Props) {
  const controller = useScenarioController(); // retreive Controller instance
  const guiController = controller.GUIController;
  const [bloodSugar, setBloodSugar] = useState(
    controller.storage.person.bloodValue.toFixed(1).toString(),
  ); // Default value

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
    <ViewContainer style={s`items-start justify-start h-full px-5 py-2`}>
      <ScrollView style={s`w-full`}>
      <View style={s`flex`}>
        <Text style={s`my-3 text-xl text-black`}>
          {' '}
          {controller.storage.person.genderStringRepresentation()}
        </Text>
        <Text style={s`mb-3 text-lg w-80 bg-white text-black pb-24`}>
          Beskrivning
        </Text>

        <Text style={s`mb-3 text-xl text-black`}>
          {' '}
          {controller.storage.person.ageStringRepresentation()}
        </Text>
        <Text style={s`mb-3 text-lg w-80 bg-white text-black pb-24`}>
          Beskrivning
        </Text>

        <Text style={s`mb-3 text-xl text-black`}>
          {' '}
          {controller.storage.person.eatingHabitStringRepresentation()}
        </Text>
        <Text style={s`mb-3 text-lg w-80 bg-white text-black pb-24`}>
          Beskrivning
        </Text>

        <Text style={s`mb-3 text-xl text-black`}>
          {' '}
          {controller.storage.person.exerciseHabitStringRepresentation()}
        </Text>
        <Text style={s`mb-3 text-lg w-80 bg-white text-black pb-24`}>
          Beskrivning
        </Text>
      </View>
      </ScrollView>
    </ViewContainer>
  );
}
export default AboutGotchiScreen;
