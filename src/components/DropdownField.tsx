import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';

import {s} from 'react-native-wind';

type DropdownFieldProps = {
  placeholder: string;

  colors: string[]; // Array of colors for the gradient
  locations?: number[]; // Optional locations for the gradient colors
  useAngle?: boolean; // Optional boolean to use angle or not
  angle?: number; // Optional angle for the gradient direction
  angleCenter?: {x: number; y: number}; // Optional center for the gradient angle
};

function DropdownField({placeholder}: DropdownFieldProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Göteborgs Universitet', value: 'Göteborgs Universitet'},
    {label: 'Malmö Universitet', value: 'Malmö Universitet'},
  ]);

  return (
    <View>
      <View>
        <DropDownPicker
          style={s`w-80 h-14 px-3 mb-5 bg-gray-100 rounded-3xl`}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={placeholder}
        />
      </View>
    </View>
  );
}

export default DropdownField;
