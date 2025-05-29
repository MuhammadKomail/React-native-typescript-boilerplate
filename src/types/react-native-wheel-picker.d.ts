declare module 'react-native-wheel-picker' {
  import React from 'react';
  import {ViewStyle} from 'react-native';

  type PickerProps = {
    data: string[] | number[];
    selectedItem: number;
    onItemSelected: (index: number) => void;
    style?: ViewStyle;
  };

  export class WheelPicker extends React.Component<PickerProps> {}
}
