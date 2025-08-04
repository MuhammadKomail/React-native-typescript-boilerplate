import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {ThemedIcon} from './ThemedIcon';

interface IncomingCallViewProps {
  onAccept: () => void;
  onDecline: () => void;
  name: string;
  avatar: string;
  backgroundUri?: string;
}

export const IncomingCallView: React.FC<IncomingCallViewProps> = ({
  onAccept,
  onDecline,
  name,
  avatar,
  backgroundUri = 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=2512&auto=format&fit=crop',
}) => (
  <ImageBackground
    source={{uri: backgroundUri}}
    style={styles.background}
    blurRadius={10}>
    <SafeAreaView style={styles.container_v2}>
      <View style={styles.callInfo}>
        <Text style={styles.callStatusText}>Incoming Call</Text>
        <Image source={{uri: avatar}} style={styles.avatar} />
        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.incomingControls}>
        <TouchableOpacity
          style={[styles.controlButton, styles.acceptButton]}
          onPress={onAccept}>
          <ThemedIcon name="call" size={30} color="#fff" />
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlButton, styles.cancelButton]}
          onPress={onDecline}>
          <ThemedIcon name="call-end" size={30} color="#fff" />
          <Text style={styles.buttonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container_v2: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  callInfo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  callStatusText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  incomingControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'absolute',
    bottom: 100,
  },
  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  cancelButton: {
    backgroundColor: '#ff3b30',
  },
  acceptButton: {
    backgroundColor: '#34c759',
    marginRight: 80,
  },
  buttonText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 12,
  },
});
