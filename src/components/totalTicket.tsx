import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, typography} from '../styles/style';

interface TotalTicketComponentProps {
  isLoading?: boolean;
}

// Sample data
const sampleData = {
  totalTickets: 15,
  completedTickets: 8
};

const TotalTicketComponent: React.FC<TotalTicketComponentProps> = ({
  isLoading = false,
}) => {
  // Skeleton Loading Component
  const SkeletonLoader = () => (
    <View>
      <View style={styles.ticketCardContainer}>
        {[1, 2].map((_, index) => (
          <View key={index} style={styles.ticketCard}>
            <View style={styles.cardRow}>
              <View
                style={{
                  backgroundColor: colors.grayHue,
                  height: 17,
                  width: '70%',
                  borderRadius: 4,
                }}
              />
            </View>
            <View style={styles.cardRow}>
              <View
                style={{
                  backgroundColor: colors.grayHue,
                  height: 30,
                  width: '40%',
                  borderRadius: 4,
                }}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  // Main Content Component
  const MainContent = () => (
    <View>
      <Text style={styles.ticketHeading}>Dashboard</Text>
      <View style={styles.ticketCardContainer}>
        <View style={styles.ticketCard}>
          <View style={styles.cardRow}>
            <Text style={styles.ticketCardTitle}>Total Tickets</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.rowText}>{sampleData.totalTickets}</Text>
          </View>
        </View>
        <View style={styles.ticketCard}>
          <View style={styles.cardRow}>
            <Text style={styles.ticketCardTitle}>Tickets Completed</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.rowText}>
              {sampleData.completedTickets}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  return isLoading ? <SkeletonLoader /> : <MainContent />;
};

export default TotalTicketComponent;

const styles = StyleSheet.create({
  ticketHeading: {
    color: colors.white,
    fontFamily: typography.fontFamilies.mullish,
    fontSize: typography.fontSizes.regular,
    fontWeight: typography.fontWeights.regular700,
  },
  ticketCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: typography.alignments.center,
  },
  ticketCard: {
    backgroundColor: colors.white,
    width: '48%',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  ticketCardTitle: {
    color: colors.tertiary,
    fontSize: typography.fontSizes.size14,
    fontWeight: typography.fontWeights.regular700,
    lineHeight: typography.fontSizes.size17,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: typography.alignments.center,
    paddingBottom: 10,
  },
  rowText: {
    fontSize: typography.fontSizes.size30,
    fontFamily: typography.fontFamilies.mullish,
    fontWeight: typography.fontWeights.regular700,
  },
  spanText: {
    fontSize: typography.fontSizes.size14,
    fontFamily: typography.fontFamilies.mullish,
    fontWeight: typography.fontWeights.regular700,
  },
});
