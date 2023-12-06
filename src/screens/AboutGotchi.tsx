import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { s } from 'react-native-wind';
import { useScenarioController } from '../components/ScenarioControllerContext';
import ViewContainer from '../components/ViewContainer';
import AttributeButton from '../components/MyGotchiComponents/AttributeButton';
import { PrivateValueStore } from '@react-navigation/native';

type RootStackParamList = {
  MyGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'MyGotchi'>;

type Props = {
  navigation: NavigationProp;
};

function AttributeSection({ label, value, description }: any) {
  return (
    <View style={s`mb-6 border-b`}>
      <View style={s`flex flex-row items-center border-black pb-2 mb-2`}>
        <Text style={s`text-xl font-bold text-black mr-2`}>{label}:</Text>
        <Text style={s`text-lg text-black`}>{value}</Text>
      </View>
      <Text style={s`text-lg text-black p-3`}>{description}</Text>
    </View>
  );
}

function AboutGotchiScreen({ navigation }: Props) {
  const controller = useScenarioController();
  const guiController = controller.GUIController;
  const [bloodSugar, setBloodSugar] = useState(
    controller.storage.person.bloodValue.toFixed(1).toString(),
  );

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
          <AttributeSection
            label="Gender"
            value={controller.storage.person.genderStringRepresentation()}
            description="Din gotchi är en..."
          />

          <AttributeSection
            label="Age"
            value={controller.storage.person.ageStringRepresentation()}
            description="Din gotchi är..."
          />

          <AttributeSection
            label="Eating Habit"
            value={controller.storage.person.eatingHabitStringRepresentation()}
            description="Din gotchi..."
          />

          <AttributeSection
            label="Exercise Habit"
            value={controller.storage.person.exerciseHabitStringRepresentation()}
            description="Din gotchi..."
          />
        </View>
      </ScrollView>
    </ViewContainer>
  );
}

export default AboutGotchiScreen;


