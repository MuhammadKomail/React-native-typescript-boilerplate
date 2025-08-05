import {
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {ThemedView} from '../../components/ThemedComponents';
import Map from '../../components/map';
import NetInfo from '@react-native-community/netinfo';
import GetLocation from 'react-native-get-location';
import {showToast} from '../../utils/toast';
import {useNavigation} from '@react-navigation/native';
import Icon from '@react-native-vector-icons/material-icons';

// Demo: Both points on main roads, close to each other
const DEMO_END = {latitude: 24.846587, longitude: 67.055508}; // Near University Road, Karachi

const MapScreen = () => {
  const [startPoint, setStartPoint] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [endPoint] = useState<{latitude: number; longitude: number}>(DEMO_END);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Fetch current location on mount
  useEffect(() => {
    setLoading(true);
    GetLocation.getCurrentPosition({enableHighAccuracy: true, timeout: 10000})
      .then(location => {
        setStartPoint({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading || !startPoint || !endPoint) {
    return (
      <ThemedView style={styles.mainContainer}>
        <ActivityIndicator size="large" color="#007AFF" style={{flex: 1}} />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.mainContainer}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => {}}>
        <Icon name="arrow-back" size={24} color="#007AFF" />
      </TouchableOpacity>
      <Map startPoint={startPoint} endPoint={endPoint} />
    </ThemedView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
  },
  backBtn: {
    position: 'absolute',
    top: 45,
    left: 16,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.85)',
    padding: 8,
    borderRadius: 8,
    elevation: 2,
  },
  backBtnText: {
    fontSize: 16,
    color: '#007AFF',
  },
});
