import React from 'react';
import {Text} from 'react-native';
import {s} from 'react-native-wind';

type TitleProps = {
  text: string;
};

const Title = ({text}: TitleProps) => (
  <Text style={s`text-5xl font-extrabold text-blue-900`}>{text}</Text>
);

export default Title;
