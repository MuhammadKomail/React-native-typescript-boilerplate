import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {colors, imgPath, typography} from '../styles/style';

interface RequestModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onSubmit: () => void;
  onClose: () => void;
  onLoading: boolean;
  title: string;
}

const RequestModal: React.FC<RequestModalProps> = ({
  visible,
  setVisible,
  onSubmit,
  onLoading,
  title,
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
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    padding: 20,
    backgroundColor: colors.white,
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
    color: colors.gray, // replaced '#7f8c8d'
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.tertiary,
    borderRadius: 5,
    fontFamily: typography.fontFamilies.mullish,
    marginBottom: 10,
    paddingHorizontal: 80,
    paddingVertical: 10,
    // width: '80%',
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
  },
});

export default RequestModal;
