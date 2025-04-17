// Jest setup to mock react-native-gesture-handler
import 'react-native-gesture-handler/jestSetup';
import netInfoMock from '@react-native-community/netinfo/jest/netinfo-mock.js';
// Mock netinfo using provided Jest mock
jest.mock('@react-native-community/netinfo', () => netInfoMock);
