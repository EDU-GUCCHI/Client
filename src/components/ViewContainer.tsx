import React, {ReactNode} from 'react';
import {View} from 'react-native';
import {s} from 'react-native-wind';
import {LinearGradient} from 'react-native-linear-gradient';
import style from '../styles/style';

type ViewContainerProps = {
  children: ReactNode; // This allows the component to accept children
};

const ViewContainer = ({children}: ViewContainerProps) => {
  return (
    <>
      <LinearGradient
        colors={['#85b0f1', '#fee0d6', '#fee0d6']}
        start={{x: 0.0, y: 1}}
        end={{x: 1, y: 0}}
        locations={[0, 0.35, 0.45]}
        useAngle={true}
        angle={35}
        angleCenter={{x: 1, y: 0.5}}
        style={s`items-center justify-center h-full`}>
        {children}
      </LinearGradient>
    </>
  );
};

export default ViewContainer;
