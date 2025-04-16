import React from 'react';
import {Text, View, Image} from 'react-native';
import {imgPath, defaultStyles} from '../../styles/style';

const OfflineScreen = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: 'white',
        display: 'flex',
        flex: 1,
        paddingVertical: '40%',
        gap: 20,
      }}>
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
