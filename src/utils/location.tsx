import GetLocation from 'react-native-get-location';
import {PermissionsAndroid, Platform} from 'react-native';

const locationConfig = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 10000,
};

/**
 * Requests location permission on Android
 * @returns {Promise<boolean>} Whether permission was granted
 */
const requestAndroidPermission = async () => {
  if (Platform.OS !== 'android') return true;

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Location Permission',
      message: 'This app needs access to your location',
      buttonPositive: 'OK',
    },
  );

  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

/**
 * Fetches current device coordinates with permission handling
 * @returns {Promise<{latitude: number, longitude: number}>} Coordinates
 * @throws {Error} If location cannot be retrieved or permission denied
 */
export const getCurrentCoordinates = async () => {
  // Check/add permissions
  if (Platform.OS === 'android') {
    const hasPermission = await requestAndroidPermission();
    if (!hasPermission) {
      throw new Error('Location permission denied');
    }
  }

  try {
    const location = await GetLocation.getCurrentPosition(locationConfig);
    return {
      latitude: location.latitude,
      longitude: location.longitude,
    };
  } catch (error) {
    const {code, message} = error as {code: string; message: string};
    switch (code) {
      case 'CANCELLED':
        throw new Error('Location request was cancelled');
      case 'UNAVAILABLE':
        throw new Error('Location services are unavailable');
      case 'TIMEOUT':
        throw new Error('Location request timed out');
      case 'UNAUTHORIZED':
        throw new Error('Location permission denied');
      default:
        throw new Error(`Failed to get location: ${message}`);
    }
  }
};
