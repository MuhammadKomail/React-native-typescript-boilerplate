import React, {useCallback, useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {defaultStyles, colors, typography} from '../styles/style';
import Button from './button';

interface BottomSheetComponentProps {
  title: string;
  open: boolean;
  list: {id: number; reason: string}[];
  setBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}

const BottomSheetComponent: React.FC<BottomSheetComponentProps> = ({
  title,
  open,
  list,
  setBottomSheet,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [inputValue, setInputValue] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [isClosable, setIsClosable] = useState(true);

  // Sync the BottomSheet with the `open` state
  useEffect(() => {
    if (open) {
      console.log('Expanding BottomSheet...');
      bottomSheetRef.current?.expand();
    } else {
      console.log('Closing BottomSheet...');
      bottomSheetRef.current?.close();
    }
  }, [open]);

  // Handle BottomSheet changes
  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log('BottomSheet index changed:', index);
      if (index === -1 && isClosable) {
        setBottomSheet(false);
      }
    },
    [setBottomSheet, isClosable],
  );

  // Simulate cancel ticket action
  const cancelTicket = () => {
    setLoading(true);
    setIsClosable(false);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setLoading(false);
      setIsClosable(true);
      setBottomSheet(false);
      setInputValue("");
      setReason("");
      console.log('Ticket cancelled with reason:', reason);
    }, 1500);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      enableDynamicSizing={true}
      enablePanDownToClose={true}
      index={-1} // Start the BottomSheet in a closed state
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text style={[defaultStyles.heading2, {alignSelf: 'center'}]}>
          {title}
        </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {list.length > 0
            ? list.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setReason(item.reason);
                    }}
                    style={{marginTop: 10}}
                    key={item.id}>
                    <Text
                      style={[
                        styles.reasonText,
                        reason === item.reason
                          ? {backgroundColor: colors.tertiary, color: 'white', borderRadius: 3, padding: 6}
                          : {}
                      ]}>
                      {item.reason}
                    </Text>
                  </TouchableOpacity>
                );
              })
            : null}
          <View style={{marginVertical: 10}}>
            <Text style={[styles.reasonText, {marginTop: 10}]}>
              Other(Write details below)
            </Text>
            <TextInput
              value={inputValue}
              onChangeText={text => {
                setInputValue(text);
                setReason(text);
              }}
              multiline={true}
              numberOfLines={7}
              style={styles.textInput}
              placeholder="Write inspection details here"
              placeholderTextColor={colors.gray}
            />
          </View>
          {loading ? (
            <ActivityIndicator
              size="small"
              color="red"
              style={{
                marginVertical: 15,
                borderColor: 'red',
                borderWidth: 1,
                padding: 10,
                backgroundColor: 'white',
              }}
            />
          ) : (
            <Button
              title="Cancel Ticket Request"
              backgroundColor={colors.white}
              textColor="red"
              style={{borderColor: 'red', borderWidth: 1, marginVertical: 15}}
              onPress={() => cancelTicket()}
            />
          )}
        </ScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: typography.fontSizes.size1,
    paddingHorizontal: typography.fontSizes.size10,
  },
  reasonText: {
    fontSize: typography.fontSizes.size14,
    fontWeight: typography.fontWeights.regular600,
    fontFamily: typography.fontFamilies.mullish,
    color: colors.black,
  },
  textInput: {
    borderWidth: typography.fontSizes.size1,
    borderColor: colors.lightGray,
    padding: typography.fontSizes.size10,
    marginVertical: typography.fontSizes.size10,
    borderRadius: typography.fontSizes.size5,
  },
});

export default BottomSheetComponent;
