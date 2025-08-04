import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface JoinCallViewProps {
  onSimulateIncomingCall: () => void;
  message: string;
}

export const JoinCallView: React.FC<JoinCallViewProps> = ({
  onSimulateIncomingCall,
  message,
}) => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Welcome to Agora Voice Call</Text>
    <TouchableOpacity style={styles.button} onPress={onSimulateIncomingCall}>
      <Text style={styles.buttonText}>Simulate Incoming Call</Text>
    </TouchableOpacity>
    <Text>{message}</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  button: {
    backgroundColor: '#0055cc',
    color: '#fff',
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  buttonText: {
    color: '#fff',
    marginTop: 5,
    fontSize: 12,
  },
});
