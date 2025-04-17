import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import {imgPath, defaultStyles, colors} from '../../styles/style';

const OfflineScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={imgPath.internet}
        resizeMode="contain"
        style={defaultStyles.imgStyles}
      />
      <Text style={defaultStyles.notFoundHeading}>No Internet</Text>
      <Text style={defaultStyles.notFoundDescription}>
        Seems like you dont have internet access, connect with stable network
        and try again.
      </Text>
    </View>
  );
};

export default OfflineScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
    display: 'flex',
    paddingVertical: '40%',
    gap: 20,
  },
});
