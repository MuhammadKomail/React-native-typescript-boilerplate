import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import {colors, typography, defaultStyles} from '../styles/style';

// Simplified ticket data structure
interface TicketData {
  id: string;
  priority: string;
  status: string;
  productDetails: {
    id: string;
    brand: string;
    name: string;
    productIssues: {
      id: string;
      name: string;
    }[];
  }[];
  customerDetails: {
    address: string;
  };
  requiredTime: string;
  requiredDate: string;
}

interface TicketCardProps {
  navigateTicketDetails?: (id: string) => void;
}

// Helper functions for badge styling
const getPriorityBadgeStyle = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'high':
      return {backgroundColor: '#FFD1D1', color: '#D32F2F'};
    case 'medium':
      return {backgroundColor: '#FFF9C4', color: '#FFA000'};
    case 'low':
      return {backgroundColor: '#C8E6C9', color: '#388E3C'};
    default:
      return {backgroundColor: '#E0E0E0', color: '#757575'};
  }
};

const getStatusBadgeStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case 'assigned':
      return {backgroundColor: '#F9E4B7', color: '#795548'};
    case 'in progress':
      return {backgroundColor: '#BBDEFB', color: '#1976D2'};
    case 'completed':
      return {backgroundColor: '#C8E6C9', color: '#388E3C'};
    case 'cancelled':
      return {backgroundColor: '#FFCDD2', color: '#D32F2F'};
    default:
      return {backgroundColor: '#E0E0E0', color: '#757575'};
  }
};

// Sample ticket data
const sampleTicket: TicketData = {
  id: 'TK-12345',
  priority: 'High',
  status: 'Assigned',
  productDetails: [
    {
      id: 'P1',
      brand: 'Samsung',
      name: 'Water Heater',
      productIssues: [
        {id: 'I1', name: 'Not heating'},
        {id: 'I2', name: 'Leaking water'},
      ],
    },
  ],
  customerDetails: {
    address: '123 Main St, Riyadh, Saudi Arabia',
  },
  requiredTime: '14:00',
  requiredDate: '2025-04-20',
};

const TicketCard: React.FC<TicketCardProps> = ({
  navigateTicketDetails = (id) => console.log(`Navigate to ticket ${id}`),
}) => {
  const ticketData = sampleTicket;

  return (
    <View style={styles.card}>
      <View style={styles.ticketHeader}>
        <Text style={styles.ticketNo}>Ticket ID {ticketData.id}</Text>
        <View style={styles.badgeContainer}>
          <Text
            style={[styles.badge, getPriorityBadgeStyle(ticketData.priority)]}>
            {ticketData.priority}
          </Text>
          <Text style={[styles.badge, getStatusBadgeStyle(ticketData.status)]}>
            {ticketData.status}
          </Text>
        </View>
      </View>
      <View style={{paddingTop: 10}}>
        {Array.isArray(ticketData.productDetails) &&
        ticketData.productDetails.length > 0 ? (
          ticketData.productDetails.map((item) => {
            return (
              <View key={item.id}>
                <Text style={styles.title}>
                  {item.brand} {item.name}
                </Text>
                {Array.isArray(item.productIssues) &&
                item.productIssues.length > 0 ? (
                  <Text style={styles.description}>
                    {item.productIssues.map(issue => issue.name).join(', ')}
                  </Text>
                ) : null}
              </View>
            );
          })
        ) : (
          <Text style={styles.noTicketsText}>No tickets found</Text>
        )}

        <View style={styles.row}>
          <MaterialIcons name="place" size={18} color={colors.tertiary} />
          <Text style={styles.location}>
            {ticketData.customerDetails.address}
          </Text>
        </View>

        <View style={styles.row}>
          <MaterialIcons name="access-time" size={18} color={colors.tertiary} />
          <Text style={styles.time}>
            {ticketData.requiredTime} | {ticketData.requiredDate}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.detailsLink}
          onPress={() => navigateTicketDetails(ticketData.id)}>
          <Text style={styles.linkText}>Check Details →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: typography.fontSizes.size8,
    padding: typography.fontSizes.size7,
    marginBottom: typography.fontSizes.size8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: typography.fontSizes.size3,
    elevation: typography.fontSizes.size2,
  },
  ticketHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: typography.alignments.center,
    justifyContent: 'space-between',
  },
  ticketNo: {
    color: colors.tertiary,
    fontSize: 12,
    fontWeight: typography.fontWeights.regular700,
    fontFamily: typography.fontFamilies.mullish,
    alignSelf: typography.alignments.center,
  },
  title: {
    fontSize: typography.fontSizes.size14,
    fontWeight: typography.fontWeights.regular600,
    marginBottom: typography.fontSizes.size5,
    color: 'black',
    fontFamily: typography.fontFamilies.mullish,
  },
  description: {
    fontSize: typography.fontSizes.small,
    fontWeight: typography.fontWeights.regular400,
    color: colors.gray,
    marginBottom: typography.fontSizes.size8,
  },
  row: {
    flexDirection: 'row',
    alignItems: typography.alignments.center,
    marginBottom: typography.fontSizes.size4,
  },
  location: {
    fontSize: typography.fontSizes.small,
    color: colors.gray,
    fontWeight: typography.fontWeights.regular400,
    marginLeft: typography.fontSizes.size4,
  },
  time: {
    fontSize: typography.fontSizes.small,
    color: colors.gray,
    fontWeight: typography.fontWeights.regular400,
    marginLeft: typography.fontSizes.size4,
  },
  badgeContainer: {
    flexDirection: 'row',
    marginVertical: typography.fontSizes.size8,
  },
  badge: {
    borderRadius: typography.fontSizes.size5,
    paddingVertical: typography.fontSizes.size4,
    paddingHorizontal: typography.fontSizes.medium,
    fontSize: typography.fontSizes.small,
    marginRight: typography.fontSizes.size8,
    overflow: 'hidden',
  },
  priorityBadge: {
    backgroundColor: '#FFD1D1',
    color: '#D32F2F',
  },
  statusBadge: {
    backgroundColor: '#F9E4B7',
    color: '#795548',
  },
  detailsLink: {
    marginTop: typography.fontSizes.size8,
    paddingRight: typography.fontSizes.size8,
    alignItems: 'flex-end',
  },
  linkText: {
    fontSize: typography.fontSizes.small,
    color: colors.primary,
    fontWeight: typography.fontWeights.regular400,
  },
  noTicketsText: {
    fontSize: typography.fontSizes.size14,
    color: '#FF0000',
    textAlign: 'center',
    marginTop: typography.fontSizes.size8,
  },
});

export default TicketCard;
