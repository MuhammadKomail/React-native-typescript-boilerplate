import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';
import {colors, imgPath, typography} from '../styles/style';

interface RequestModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSubmit: () => void;
  onClose: () => void;
  onLoading: boolean;
  title: string
}

const RequestModal: React.FC<RequestModalProps> = ({
  visible,
  setVisible,
  onSubmit,
  onClose,
  onLoading,
  title
}) => {
  const toggleModal = () => {
    setVisible(!visible);
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={toggleModal}
      style={styles.modal}>
      <View style={styles.modalContent}>
        <Image source={imgPath.cart} style={styles.icon} />
        <Text style={styles.title}>Spare Parts Received Successfully</Text>
        <Text style={styles.description}>
          Spare parts received successfully and have been added to your
          inventory.
        </Text>
        <View style={styles.buttonContainer}>
          {onLoading ? (
            <TouchableOpacity style={styles.button}>
              <ActivityIndicator color={colors.white} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
              <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkText}>View Ticket →</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  showButton: {
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  showButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    // width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.tertiary,
    fontFamily: typography.fontFamilies.mullish,
    paddingVertical: 10,
    paddingHorizontal: 80,
    // width: '80%',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  linkButton: {
    marginTop: 10,
  },
  linkText: {
    color: '#3498db',
    fontSize: 14,
  },
});

export default RequestModal;
