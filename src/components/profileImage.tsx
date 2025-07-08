import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, imgPath} from '../styles/style'; // Adjust the path to your styles

interface ProfileImageProps {
  imageSource: {uri: string} | null; // Define the type for imageSource
  onCameraPress: () => void; // Define the type for onCameraPress
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  imageSource,
  onCameraPress,
}) => {
  return (
    <View style={styles.container}>
      {/* Circular Profile Image */}
      <Image
        source={imageSource || {uri: 'https://via.placeholder.com/150'}} // Default placeholder image
        style={styles.profileImage}
      />

      {/* Camera Icon Overlay */}
      <TouchableOpacity
        style={styles.cameraIconContainer}
        onPress={onCameraPress}>
        <Image
          source={imgPath.profileCamera} // Default placeholder image
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
  },
  profileImage: {
    borderColor: colors.tertiary, // Match your app's color scheme
    borderRadius: 75,
    borderWidth: 4,
    height: '100%',
    width: '100%',
  },
  cameraIconContainer: {
    alignItems: 'center',
    backgroundColor: colors.white, // Match your app's color scheme
    borderColor: colors.tertiary,
    borderRadius: 15,
    borderWidth: 2,
    bottom: 0,
    height: 35,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    width: 35,
  },
});

export default ProfileImage;
