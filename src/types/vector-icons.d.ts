declare module '@react-native-vector-icons/material-icons' {
  import {Component} from 'react';
  import {TextStyle} from 'react-native';

  interface IconProps {
    name: string;
    size?: number;
    color?: string;
    style?: TextStyle;
  }

  export default class Icon extends Component<IconProps> {}
}
