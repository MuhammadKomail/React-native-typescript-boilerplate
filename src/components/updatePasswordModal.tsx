import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import Button from './button';
import {typography, colors} from '../styles/style';

interface UpdatePasswordModalProps {
  visible: boolean;
  loading: boolean;
  onSubmit: () => void;
  onClose: () => void;
  setPasswords: Dispatch<
    SetStateAction<{currentPassword: string; newPassword: string}>
  >;
  passwords: {currentPassword: string; newPassword: string};
}

const UpdatePasswordModal: React.FC<UpdatePasswordModalProps> = ({
  visible,

  onSubmit,
  onClose,
  setPasswords,
  passwords,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.headerRow}>
            <Text />
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={[styles.title, styles.titleRight]}>X</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="******"
            secureTextEntry
            value={passwords.currentPassword}
            onChangeText={text =>
              setPasswords(prev => ({...prev, currentPassword: text}))
            }
          />
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="******"
            secureTextEntry
            value={passwords.newPassword}
            onChangeText={text =>
              setPasswords(prev => ({...prev, newPassword: text}))
            }
          />
          <Button title="Change Password" onPress={() => onSubmit()} />
        </View>
      </View>
    </Modal>
  );
};

export default UpdatePasswordModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.overlay, // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 25,
    display: 'flex',
    borderRadius: 2,
    justifyContent: 'flex-end',
    textAlign: 'center',
    width: '15%',
    marginBottom: 20,
  },
  titleRight: {
    borderWidth: 1,
    borderColor: colors.gray,
  },
  input: {
    height: 50,
    borderColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },

  label: {
    fontFamily: typography.fontFamilies.mullish,
    fontWeight: '500',
    fontSize: typography.fontSizes.size14,
    paddingBottom: 7,
  },
  headerRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButton: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
