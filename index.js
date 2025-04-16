/**
 * @format
 */
import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import * as WebStreamsPolyfill from 'web-streams-polyfill';

if (!global.ReadableStream) {
  global.ReadableStream = WebStreamsPolyfill.ReadableStream;
}
if (!global.WritableStream) {
  global.WritableStream = WebStreamsPolyfill.WritableStream;
}
if (!global.TransformStream) {
  global.TransformStream = WebStreamsPolyfill.TransformStream;
}
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
