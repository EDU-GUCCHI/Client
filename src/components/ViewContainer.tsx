import React, { ReactNode } from 'react';
import {View} from 'react-native';
import { s } from 'react-native-wind';

type ViewContainerProps = {
  children: ReactNode; // This allows the component to accept children
};

const ViewContainer = ({children}: ViewContainerProps) => {
  return (
    <>
      <View style={s`items-center justify-center bg-coolGray-100`}>
        {children}
      </View>
    </>
  );
};

export default ViewContainer;
