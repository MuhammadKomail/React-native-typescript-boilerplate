import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import { colors, typography, imgPath } from '../styles/style'; // Adjust the path to your styles

interface ProfileImageProps {
  imageSource: { uri: string } | null; // Define the type for imageSource
  onCameraPress: () => void; // Define the type for onCameraPress
}

const ProfileImage: React.FC<ProfileImageProps> = ({ imageSource, onCameraPress }) => {
  return (
    <View style={styles.container}>
      {/* Circular Profile Image */}
      <Image
        source={imageSource || { uri: 'https://via.placeholder.com/150' }} // Default placeholder image
        style={styles.profileImage}
      />

      {/* Camera Icon Overlay */}
      <TouchableOpacity style={styles.cameraIconContainer} onPress={onCameraPress}>
        {/* <Icon name="photo-camera" size={20} color="#fff" /> */}
        <Image
        source={imgPath.profileCamera} // Default placeholder image
        style={{height: 22, width: 22}}
      />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, // Add spacing below the image
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
    borderWidth: 4,
    borderColor: colors.tertiary, // Match your app's color scheme
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.white, // Match your app's color scheme
    borderRadius: 15,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.tertiary,
  },
});

export default ProfileImage;