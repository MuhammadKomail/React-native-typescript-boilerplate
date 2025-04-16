import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, imgPath, typography} from '../styles/style';

const RequestCard = () => {
  // Simple dummy functions for navigation
  const goToInStock = () => {
    console.log('Navigating to inventory screen');
    // In a real app, this would navigate to the inventory screen
  };

  const goToRequest = () => {
    console.log('Navigating to spare parts request screen');
    // In a real app, this would navigate to the spare parts request screen
  };

  return (
    <View>
      <Text style={styles.requestHeading}>Requests</Text>
      <View style={styles.requestCardContainer}>
        <TouchableOpacity
          onPress={() => goToInStock()}
          style={styles.requestCardLeft}>
          <View style={styles.cardRow}>
            <Text style={styles.requestCardTitle}></Text>
            <View
              style={[styles.imgContainer, {backgroundColor: colors.primary}]}>
              <Image style={styles.imgStyle} source={imgPath.parts} />
            </View>
          </View>
          <View style={[styles.cardRow, {paddingHorizontal: 10}]}>
            <Text style={styles.rowText}>In Stock Inventory</Text>
            <Image style={styles.arrowStyle} source={imgPath.arrow} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => goToRequest()}
          style={styles.requestCardRight}>
          <View style={styles.cardRow}>
            <Text style={styles.requestCardTitle}></Text>
            <View
              style={[styles.imgContainer, {backgroundColor: colors.orange}]}>
              <Image style={styles.imgStyle} source={imgPath.tools} />
            </View>
          </View>
          <View style={[styles.cardRow, {paddingHorizontal: 10}]}>
            <Text style={styles.rowText}>Spare Part Requests</Text>
            <Image style={styles.arrowStyle} source={imgPath.arrow} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RequestCard;

const styles = StyleSheet.create({
  requestHeading: {
    color: colors.tertiary,
    fontFamily: typography.fontFamilies.mullish,
    fontSize: typography.fontSizes.regular,
    fontWeight: typography.fontWeights.regular700,
  },
  requestCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: typography.alignments.center,
  },
  requestCardLeft: {
    backgroundColor: colors.blueHue,
    borderColor: colors.primary,
    borderWidth: 1,
    width: '48%',
    //   padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  requestCardRight: {
    backgroundColor: colors.pinkHue,
    borderColor: colors.orange,
    borderWidth: 1,
    width: '48%',
    // padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  requestCardTitle: {
    color: colors.tertiary,
    fontSize: typography.fontSizes.size14,
    fontWeight: typography.fontWeights.regular700,
    lineHeight: typography.fontSizes.size17,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  rowText: {
    fontSize: typography.fontSizes.size14,
    color: colors.tertiary,
    fontFamily: typography.fontFamilies.mullish,
    fontWeight: typography.fontWeights.regular700,
    width: '50%',
  },
  imgStyle: {
    height: 34,
    width: 34,
    resizeMode: 'contain',
  },
  imgContainer: {
    height: 64,
    width: 64,
    borderBottomLeftRadius: 40,
    paddingLeft: 10,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowStyle: {
    width: 30,
    height: 30,
  },
});
