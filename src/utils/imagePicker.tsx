import ImagePicker from 'react-native-image-picker';

// Utility function for image picking
export const pickImage = async (options = {}) => {
  // Default options
  const defaultOptions = {
    source: 'library', // 'library' or 'camera'
    mediaType: 'photo' as const,
    quality: 1 as const,
    maxWidth: 500,
    maxHeight: 500,
    includeBase64: false,
    ...options, // Override defaults with provided options
  };

  return new Promise((resolve, reject) => {
    const pickerMethod = 
      defaultOptions.source === 'camera' 
        ? ImagePicker.launchCamera 
        : ImagePicker.launchImageLibrary;

    pickerMethod(defaultOptions, (response) => {
      if (response.didCancel) {
        resolve({ cancelled: true });
      } else if (response.errorCode) {
        reject(new Error(`ImagePicker Error: ${response.errorMessage}`));
      } else {
        const imageData: {
          uri: string | undefined;
          type: string | undefined;
          fileName: string | undefined;
          width: number | undefined;
          height: number | undefined;
          base64?: string;
        } = {
          uri: response.assets?.[0]?.uri,
          type: response.assets?.[0]?.type,
          fileName: response.assets?.[0]?.fileName,
          width: response.assets?.[0]?.width,
          height: response.assets?.[0]?.height,
        };

        if (defaultOptions.includeBase64) {
          imageData.base64 = response.assets?.[0]?.base64;
        }

        resolve(imageData);
      }
    });
  });
};

// Example usage:
/*
import { pickImage } from './imagePickerUtils';

// For camera
const handleCameraPick = async () => {
  try {
    const image = await pickImage({ source: 'camera', quality: 0.8 });
    if (!image.cancelled) {
      console.log('Captured image:', image);
    }
  } catch (error) {
    console.error('Error capturing image:', error);
  }
};

// For gallery
const handleGalleryPick = async () => {
  try {
    const image = await pickImage({ source: 'library', quality: 0.8 });
    if (!image.cancelled) {
      console.log('Selected image:', image);
    }
  } catch (error) {
    console.error('Error selecting image:', error);
  }
};
*/