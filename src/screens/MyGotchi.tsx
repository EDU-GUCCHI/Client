import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { s } from 'react-native-wind';
import MyGotchiStatus from '../components/MyGotchiComponents/MyGotchiStatus';
import { useScenarioController } from '../components/ScenarioControllerContext';
import ViewContainer from '../components/ViewContainer';
import BackButton from '../components/BackButton';
import { useRoute } from '@react-navigation/native';

type RootStackParamList = {
  AboutGotchi: {
    gender: string;
    age: string;
    eatingHabit: string;
    exerciseHabit: string;
  };
};

function AttributeSection({ label, value, emoji, flex }: any) {
  return (
    <View style={s`bg-blue-100 p-4 rounded-lg mb-4 mx-2 flex-${flex}`}>
      <Text style={s`text-lg font-bold text-gray-800 mb-2`}>{label} {emoji}</Text>
      <Text style={s`text-base text-gray-700`}>{value}</Text>
    </View>
  );
}

function MyGotchiScreen({ navigation }: Props) {
  const controller = useScenarioController();
  const guiController = controller.GUIController;
  const [bloodSugar, setBloodSugar] = useState(
    guiController.currentBloodValue.toFixed(1).toString(),
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

  const route = useRoute();
  const { params } = route;

  return (
    <ViewContainer style={s`flex-1 items-center justify-center px-5 py-4 bg-white pt-15`}>
      <BackButton />

      {/* Profile Info */}
      <View style={s`items-center my-5 mb-4`}>
        <View style={s`bg-blue-500 p-4 rounded-full mb-3`}>
          <Text style={s`text-4xl text-black`}>😇</Text>
        </View>
        <Text style={s`text-black font-semibold text-2xl`}>
          {controller.storage.person.name}-GOTCHI
        </Text>
      </View>

      {/* Blood Sugar - Full Width */}
      <View style={s`bg-blue-100 p-6 rounded-lg w-full mb-4 flex-row justify-between`}>
        <Text style={s`text-lg font-bold text-gray-800`}>Blodsocker 🩸</Text>
        <Text style={s`text-lg font-bold text-gray-800`}>{bloodSugar}</Text>
      </View>

      {/* Attribute Sections */}
      <View style={s`flex-row w-full`}>
        <AttributeSection
          label="Kön"
          value={controller.storage.person.genderStringRepresentation()}
          emoji="🚻"
          flex={1}
        />
        <AttributeSection
          label="Ålder"
          value={controller.storage.person.ageStringRepresentation()}
          emoji="👶"
          flex={1}
        />
      </View>
      <View style={s`flex-row w-full`}>
        <AttributeSection
          label="Kost"
          value={controller.storage.person.eatingHabitStringRepresentation()}
          emoji="🍽️"
          flex={1}
        />
        <AttributeSection
          label="Träning"
          value={controller.storage.person.exerciseHabitStringRepresentation()}
          emoji="🏋️"
          flex={1}
        />
      </View>
    </ViewContainer>
  );
}

export default MyGotchiScreen;

