import React from 'react';
import {View, Image, Modal, StyleSheet} from 'react-native';
import {colors, imgPath} from '../styles/style';

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({isLoading}) => {
  return (
    <Modal transparent animationType="fade" visible={isLoading}>
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <Image
            source={imgPath.loader}
            style={styles.loaderImage}
            resizeMode="contain"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderImage: {
    width: 80,
    height: 80,
  },
});

export default Loader;
