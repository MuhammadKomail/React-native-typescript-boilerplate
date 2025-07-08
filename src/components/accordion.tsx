import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
// import MaterialIcons from '@react-native-vector-icons/material-icons'; // Removed as unused
import {colors, typography, defaultStyles} from '../styles/style';

interface AccordionProps {
  sections: {title: string; content: string}[];
}

const CustomAccordion: React.FC<AccordionProps> = ({sections}) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const renderHeader = (
    section: {title: string},
    _index: number,
    _isActive: boolean,
  ) => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{section.title}</Text>
      {/* Icon code commented out, can be restored if needed */}
    </View>
  );

  const renderContent = () => (
    <>
      <View style={styles.contentContainer}>
        <View style={styles.descriptionContainer}>
          <Text style={defaultStyles.ticketTitle}>
            Detailed Description of Issue:
          </Text>
          <View style={styles.issuesListContainer}>
            <View style={styles.issueItem}>
              <Text style={defaultStyles.ticketTitle}>
                {'Cooling Issue: '}
                <Text style={styles.issueDescription}>
                  The refrigerator is not cooling properly. The temperature
                  inside is not staying consistent, and the food is spoiling
                  quicker than usual.
                </Text>
              </Text>
            </View>
            <View style={styles.issueItem}>
              <Text style={defaultStyles.ticketTitle}>
                {'Water Leak: '}
                <Text style={styles.issueDescription}>
                  There is noticeable water leakage inside the fridge, pooling
                  at the bottom of the refrigerator compartment.
                </Text>
              </Text>
            </View>
            <View style={styles.issueItem}>
              <Text style={defaultStyles.ticketTitle}>
                {'Excessive Noise: '}
                <Text style={styles.issueDescription}>
                  The refrigerator is making a loud, persistent humming noise
                  when running. The noise is constant, and sometimes it gets
                  louder than usual, especially when the cooling cycle kicks in.
                </Text>
              </Text>
            </View>
            <View style={styles.issueItem}>
              <Text style={defaultStyles.ticketTitle}>
                {'Control Panel Malfunction: '}
                <Text style={styles.issueDescription}>
                  The control panel/display is not responding consistently. Some
                  buttons are unresponsive.
                </Text>
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.customerDetailsContainer}>
          <Text style={styles.customerDetailsTitle}>Customer Details</Text>
          <Text style={styles.customerDetailsText}>+966 555 123 456</Text>
          <Text style={styles.customerDetailsText}>
            123 King Fahd Road, Al Mahz
          </Text>
        </View>
      </View>
    </>
  );

  return (
    <Accordion
      sections={sections}
      activeSections={activeSections}
      renderHeader={(section, index) =>
        renderHeader(section, index, activeSections.includes(index))
      }
      renderContent={renderContent}
      onChange={setActiveSections}
      touchableComponent={TouchableOpacity}
    />
  );
};

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 13,
    backgroundColor: colors.white, // moved from literal
  },
  headerText: {
    fontSize: 16,
    fontFamily: typography.fontFamilies.mullish,
  },
  // Removed unused styles: content, contentText, issueTitle
  issueItem: {
    marginBottom: typography.fontSizes.regular,
    alignItems: 'flex-start',
    justifyContent: typography.alignments.center,
  },
  issueDescription: {
    fontSize: typography.fontSizes.medium,
    color: colors.gray,
  },
  descriptionContainer: {
    padding: typography.fontSizes.size10,
    borderRadius: 8,
    backgroundColor: colors.grayHue,
    paddingHorizontal: 10,
  },
  contentContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
  },
  issuesListContainer: {
    paddingVertical: 10,
  },
  customerDetailsContainer: {
    padding: 10,
    gap: 10,
  },
  customerDetailsTitle: {
    fontFamily: typography.fontFamilies.mullish,
    fontSize: typography.fontSizes.size14,
    fontWeight: typography.fontWeights.regular700,
    color: colors.black,
  },
  customerDetailsText: {
    fontFamily: typography.fontFamilies.mullish,
    fontSize: typography.fontSizes.size14,
    fontWeight: typography.fontWeights.regular400,
    color: colors.gray,
  },
});

export default CustomAccordion;
