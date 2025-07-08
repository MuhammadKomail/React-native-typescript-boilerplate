import React, {useRef, useImperativeHandle, forwardRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import SignatureScreen, {SignatureViewRef} from 'react-native-signature-canvas';
import {colors, defaultStyles} from '../styles/style';
import Button from './button';
import Icon from '@react-native-vector-icons/material-icons';

// Export the ref type for parent components to use
export interface SignaturePadRef {
  clearSignature: () => void;
}

// Update the SignaturePadProps interface
interface SignaturePadProps {
  text: string;
  onOK: (signature: string) => void;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
  onConfirm: () => void;
}

const webStyle = `
  .m-signature-pad {box-shadow: none; border: none; height: 250px;}
  .m-signature-pad--body {border: none; height: 250px;}
  .m-signature-pad--footer {display: none; margin: 0px;}
  body, html {
    width: 100%; height: 250px; margin: 0; padding: 0; overflow: hidden;
  }
`;

const SignaturePad = forwardRef<SignaturePadRef, SignaturePadProps>(
  (props, ref) => {
    const {text, onOK, onConfirm, onTouchEnd, onTouchStart} = props;
    const signatureRef = useRef<SignatureViewRef>(null);

    // Expose methods to parent component
    useImperativeHandle(ref, () => ({
      clearSignature: () => {
        if (signatureRef.current) {
          signatureRef.current.clearSignature();
        }
      },
    }));

    const handleOK = (signature: string) => {
      onOK(signature);
    };

    const handleConfirm = () => {
      if (signatureRef.current) {
        signatureRef.current.readSignature();
      }
      onConfirm();
    };

    const handleEnd = () => {
      signatureRef.current?.readSignature();
      onTouchEnd?.(); // enable scrolling when signature ends...!
    };

    const handleClear = () => {
      if (signatureRef.current) {
        signatureRef.current.clearSignature();
      }
    };

    return (
      <View style={defaultStyles.innerContainer}>
        <Text style={defaultStyles.heading4}>Customer E-Signature</Text>
        <View style={styles.container}>
          <SignatureScreen
            ref={signatureRef}
            onOK={handleOK}
            onBegin={() => {
              onTouchStart?.();
            }} // Disable scrolling when signature starts
            onEnd={handleEnd}
            webStyle={webStyle}
            descriptionText={text}
            backgroundColor={colors.blueHue}
          />
          <Icon
            name="repeat"
            size={30}
            color={colors.tertiary}
            style={styles.clearButton}
            onPress={handleClear}
          />
        </View>
        <Button
          title="Confirm Signature"
          onPress={handleConfirm}
          style={styles.submitButton}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginBottom: 20,
  },
  signatureHeading: {
    color: colors.tertiary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  container: {
    backgroundColor: colors.white,
    height: 250,
    margin: 20,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.blueHue,
    position: 'relative',
  },
  clearButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: colors.primary,
    marginHorizontal: 20,
  },
});

SignaturePad.displayName = 'SignaturePad';

export default SignaturePad;
