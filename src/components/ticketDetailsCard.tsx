import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {colors, defaultStyles} from '../styles/style';
import Button from './button';
import BottomSheetComponent from './bottomSheet';

interface TicketDetailsCardProps {
  navigateInspectionScreen?: () => void;
}

// Sample data for reasons
const reasonsData = [
  {
    id: 1,
    reason: 'Customer Unavailable',
  },
  {
    id: 2,
    reason: 'Incorrect ticket assignment',
  },
  {
    id: 3,
    reason: 'Issue resolved without service',
  },
];

const TicketDetailsCard: React.FC<TicketDetailsCardProps> = ({
  navigateInspectionScreen = () => {},
}) => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  // Function to open bottom sheet
  const openBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };

  return (
    <View>
      <View style={defaultStyles.innerContainer} />
      <Button title="Start Inspection" onPress={navigateInspectionScreen} />
      <Text style={styles.paddingTopOne} />
      <Button
        title="Cancel Ticket Request"
        backgroundColor={colors.white}
        textColor={colors.error}
        style={styles.cancelButton}
        onPress={openBottomSheet}
      />
      <BottomSheetComponent
        title="Why do you want to cancel ?"
        open={isBottomSheetVisible}
        list={reasonsData}
        setBottomSheet={setIsBottomSheetVisible}
      />
    </View>
  );
};

export default TicketDetailsCard;

const styles = StyleSheet.create({
  paddingTopOne: {
    paddingTop: 1,
  },
  cancelButton: {
    borderColor: colors.error,
    borderWidth: 1,
  },
});
