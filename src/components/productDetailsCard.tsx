import {Text, View} from 'react-native';
import React from 'react';
import {defaultStyles} from '../styles/style';
import Button from './button';

const productDetails = [
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
          ? productDetails.map(item => (
              <View style={defaultStyles.ticketInfoContainer} key={item.title}>
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
      <Button title="Request For Spare Parts" onPress={() => {}} />
    </View>
  );
};

export default ProductDetailsCard;
