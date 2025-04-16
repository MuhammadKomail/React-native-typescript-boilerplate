import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {colors, defaultStyles, typography} from '../styles/style';
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
  navigateInspectionScreen = () => console.log('Navigate to inspection screen'),
}) => {
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  // Function to open bottom sheet
  const openBottomSheet = () => {
    setIsBottomSheetVisible(true);
  };

  return (
    <View>
      <View style={defaultStyles.innerContainer}></View>
      <Button title="Start Inspection" onPress={navigateInspectionScreen} />
      <Text style={{paddingTop: 1}}></Text>
      <Button
        title="Cancel Ticket Request"
        backgroundColor={colors.white}
        textColor="red"
        style={{borderColor: 'red', borderWidth: 1}}
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
  mainContainer: {
    marginBottom: '90%',
  },
  container: {
    backgroundColor: colors.white,
    borderWidth: typography.fontSizes.size1,
    borderColor: colors.grayHue,
    marginVertical: typography.fontSizes.size10,
    padding: typography.fontSizes.size10,
    borderRadius: typography.fontSizes.size8,
  },
  descriptionContainer: {
    paddingTop: typography.fontSizes.size10,
    borderTopWidth: typography.fontSizes.size1,
    borderTopColor: colors.grayHue,
  },
  issueItem: {
    marginBottom: typography.fontSizes.regular,
    alignItems: 'flex-start',
    justifyContent: typography.alignments.center,
  },
  issueTitle: {
    fontSize: typography.fontSizes.medium,
    fontWeight: typography.fontWeights.bold,
    color: colors.black,
    marginBottom: typography.fontSizes.size4,
  },
  issueDescription: {
    fontSize: typography.fontSizes.medium,
    color: colors.gray,
  },
});
