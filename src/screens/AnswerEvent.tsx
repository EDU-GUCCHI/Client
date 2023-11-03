import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {s} from 'react-native-wind';
import { SelectList } from 'react-native-dropdown-select-list'


type RootStackParamList = {
  CreateGotchi: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'CreateGotchi'>;

type Props = {
  navigation: NavigationProp;
};


function AnswerEventScreen() {

  const [selected, setSelected] = React.useState("");
  const data = [
      {key:'1', value:'Caused by', disabled:true},
      {key:'2', value:'Träning'},
      {key:'3', value:'Kost'},
      {key:'4', value:'Annat :)'},
  ]

  return(
    <View>
      <Text style={s`text-4xl text-center m-4 mb-1 text-warmGray-600 font-semibold`}>Caused by:</Text>
      <SelectList 
          setSelected={(val:any) => setSelected(val)} 
          data={data} 
          save="value"
      />
    </View>
  )
    
};
export default AnswerEventScreen;


