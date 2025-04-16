import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, typography, defaultStyles} from '../styles/style';
import SparePartsSuggestion from './sparePartsSuggestion';
import Button from './button';

let productDetails = [
  {
    title: 'Samsung Split AC',
    productType: 'AC',
    brand: 'Samsung',
    model: 'RSSON3513SA',
    serialNumber: '123456789',
    purchaseDate: '2024-08-15',
  },
  {
    title: 'LG Window AC',
    productType: 'AC',
    brand: 'LG',
    model: 'RSSON3513SA',
    serialNumber: '123456789',
    purchaseDate: '2024-08-15',
  },
];

const ProductDetailsCard = () => {
  return (
    <View>
      <View style={defaultStyles.innerContainer}>
        <View style={defaultStyles.ticketHeader}>
          <Text style={defaultStyles.ticketNo}>Ticket ID 12343212</Text>
          <View style={defaultStyles.badgeContainer}>
            <Text style={[defaultStyles.badge, defaultStyles.priorityBadge]}>
              High
            </Text>
            <Text style={[defaultStyles.badge, defaultStyles.statusBadge]}>
              In Progress
            </Text>
          </View>
        </View>
        {productDetails.length > 0
          ? productDetails.map((item, index) => (
              <View style={defaultStyles.ticketInfoContainer}>
                <Text style={defaultStyles.ticketTitle}>{item.title}</Text>
                <Text style={defaultStyles.itemInfo}>
                  Product Type: {item.productType}
                </Text>
                <Text style={defaultStyles.itemInfo}>Brand: {item.brand}</Text>
                <Text style={defaultStyles.itemInfo}>Model: {item.model}</Text>
                <Text style={defaultStyles.itemInfo}>
                  Serial Number: {item.serialNumber}
                </Text>
                <Text style={defaultStyles.itemInfo}>
                  Purchase Date: {item.purchaseDate}
                </Text>
              </View>
            ))
          : null}
        {/* <SparePartsSuggestion /> */}
      </View>
      <Button
        title="Request For Spare Parts"
        onPress={() => console.log('test')}
      />
    </View>
  );
};

export default ProductDetailsCard;

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
