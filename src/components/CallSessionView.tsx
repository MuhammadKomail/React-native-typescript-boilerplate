import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {ThemedIcon} from './ThemedIcon';

interface CallSessionViewProps {
  name: string;
  avatar: string;
  timer: string;
  isMuted: boolean;
  isSpeakerphoneEnabled: boolean;
  onToggleMute: () => void;
  onToggleSpeakerphone: () => void;
  onEndCall: () => void;
  isTimeLimitModalVisible: boolean;
  onCloseTimeLimitModal: () => void;
  backgroundUri?: string;
  style?: StyleProp<ViewStyle>;
}

export const CallSessionView: React.FC<CallSessionViewProps> = ({
  name,
  avatar,
  timer,
  isMuted,
  isSpeakerphoneEnabled,
  onToggleMute,
  onToggleSpeakerphone,
  onEndCall,
  isTimeLimitModalVisible,
  onCloseTimeLimitModal,
  backgroundUri = 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=2512&auto=format&fit=crop',
  style,
}) => {
  return (
    <ImageBackground
      source={{uri: backgroundUri}}
      style={[styles.background, style]}
      blurRadius={10}>
      <SafeAreaView style={styles.container_v2}>
        <View style={styles.callInfo}>
          <Text style={styles.callStatusText}>Calling...</Text>
          <Image source={{uri: avatar}} style={styles.avatar} />
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.timer}>{timer}</Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={onToggleMute}>
            <ThemedIcon
              name={isMuted ? 'mic-off' : 'mic'}
              size={30}
              color="#fff"
            />
            <Text style={styles.buttonText}>Mute</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={onToggleSpeakerphone}>
            <ThemedIcon
              name={isSpeakerphoneEnabled ? 'volume-up' : 'volume-down'}
              size={30}
              color="#fff"
            />
            <Text style={styles.buttonText}>Speaker</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.controlButton, styles.cancelButton]}
            onPress={onEndCall}>
            <ThemedIcon name="call-end" size={30} color="#fff" />
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isTimeLimitModalVisible}
          onRequestClose={onCloseTimeLimitModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Time's Almost Up!</Text>
              <Text style={styles.modalText}>
                Your 30-minute session is about to end. Wrap up the session so
                that nothing is left unsorted.
              </Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={onCloseTimeLimitModal}>
                <Text style={styles.modalButtonText}>Got it</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};

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
  timer: {
    fontSize: 20,
    color: '#fff',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
    overflow: 'hidden',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 30,
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
  buttonText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: '#0055cc',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: '100%',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
