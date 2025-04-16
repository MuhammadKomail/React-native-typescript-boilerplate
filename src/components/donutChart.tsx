import {StyleSheet, Text, View, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import PieChart from 'react-native-pie-chart';
import {colors, typography} from '../styles/style';

interface DonutChartProps {
  widthAndHeight: number;
  series: {value: number; color: string}[];
  cover: number;
  names: string[];
  isLoading: boolean;
}

const DonutChart: React.FC<DonutChartProps> = ({
  widthAndHeight,
  series,
  cover,
  names,
  isLoading
}) => {
  const seriesWithNames = series.map((item, index) => ({
    ...item,
    name: names[index],
  }));
  
  const seriesSum = series.reduce((acc, item) => acc + item.value, 0);

  // Skeleton Loading Component with Animation
  const SkeletonLoader = () => {
    const fadeAnim = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 0.5,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, [fadeAnim]);

    return (
      <Animated.View style={[styles.chartContainer, {opacity: fadeAnim}]}>
        <View style={[styles.chartTitle, {
          backgroundColor: colors.grayHue,
          height: 14,
          width: 100,
          borderRadius: 4,
          marginBottom: 10
        }]} />
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View style={{width: '40%'}}>
            <View style={{
              width: widthAndHeight,
              height: widthAndHeight,
              borderRadius: widthAndHeight / 2,
              backgroundColor: colors.grayHue
            }} />
          </View>
          <View style={{
            flexDirection: 'column',
            flex: 1,
            paddingLeft: 16,
            width: '40%',
          }}>
            {[1, 2, 3].map((_, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.colorBox, {backgroundColor: colors.grayHue}]} />
                <View style={{
                  backgroundColor: colors.grayHue,
                  height: 12,
                  width: '40%',
                  borderRadius: 4
                }} />
                <View style={{
                  backgroundColor: colors.grayHue,
                  height: 12,
                  width: '20%',
                  borderRadius: 4
                }} />
              </View>
            ))}
          </View>
        </View>
      </Animated.View>
    );
  };

  // Main Content Component
  const MainContent = () => {
    if (seriesSum === 0) {
      return (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Tickets Status</Text>
          <Text style={styles.noDataText}>No ticket data available</Text>
        </View>
      );
    }

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Tickets Status</Text>
        <View style={{display: 'flex', flexDirection:'row'}}>
          <View style={{width: '40%'}}>
            <PieChart
              widthAndHeight={widthAndHeight}
              series={series}
              cover={cover}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              paddingLeft: 16,
              width: '40%',
            }}>
            {seriesWithNames.map((item, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.colorBox, {backgroundColor: item.color}]} />
                <Text style={styles.statusStyles}>{item.name}</Text>
                <Text style={styles.valueStyles}>{item.value}%</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  return isLoading ? <SkeletonLoader /> : <MainContent />;
};

export default DonutChart;

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: colors.white,
    borderRadius: typography.fontSizes.size10,
    padding: typography.fontSizes.size10,
    marginVertical: 15
  },
  chartTitle: {
    fontSize: typography.fontSizes.size14,
    fontFamily: typography.fontFamilies.mullish,
    fontWeight: typography.fontWeights.regular700,
    color: colors.tertiary,
    paddingBottom: typography.fontSizes.size10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: typography.fontSizes.size8,
  },
  colorBox: {
    width: typography.fontSizes.medium,
    height: typography.fontSizes.medium,
    borderRadius: typography.fontSizes.size4,
    marginRight: typography.fontSizes.size8,
  },
  statusStyles: {
    color: colors.gray,
    flex: typography.fontSizes.size1,
  },
  valueStyles: {
    color: colors.tertiary,
    fontWeight: typography.fontWeights.regular700,
  },
  noDataText: {
    color: colors.gray,
    fontSize: typography.fontSizes.size14,
    textAlign: 'center',
    paddingVertical: 20,
  },
});