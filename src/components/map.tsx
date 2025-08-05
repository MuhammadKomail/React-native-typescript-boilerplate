import React, {useRef, useEffect, useState} from 'react';
import MapView, {Marker, Polyline, MapViewProps} from 'react-native-maps';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {decodePolyline} from '../utils/polyline';
import colors from '../styles/colors';

interface MapProps {
  startPoint: {latitude: number; longitude: number};
  endPoint: {latitude: number; longitude: number};
}

const GOOGLE_MAPS_API_KEY = 'AIzaSyC35u9CrnXwbcLT9bCjXdfQtxvPnp4P3lQ';

const Map: React.FC<MapProps> = ({startPoint, endPoint}) => {
  const mapRef = useRef<MapView>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [routeCoords, setRouteCoords] = useState<
    Array<{latitude: number; longitude: number}>
  >([]);
  const [routeLoading, setRouteLoading] = useState(true);

  // Fetch route from Google Directions API
  useEffect(() => {
    const fetchRoute = async () => {
      setRouteLoading(true);
      try {
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startPoint.latitude},${startPoint.longitude}&destination=${endPoint.latitude},${endPoint.longitude}&mode=driving&key=${GOOGLE_MAPS_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.routes && data.routes.length > 0) {
          const points = data.routes[0].overview_polyline.points;
          const coords = decodePolyline(points);
          setRouteCoords(coords);
        } else {
          setRouteCoords([startPoint, endPoint]); // fallback
        }
      } catch (e) {
        setRouteCoords([startPoint, endPoint]);
      }
      setRouteLoading(false);
    };
    fetchRoute();
  }, [startPoint, endPoint]);

  useEffect(() => {
    if (mapRef.current && mapLoaded) {
      mapRef.current.animateToRegion(
        {
          ...startPoint,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1000,
      );
    }
  }, [startPoint, mapLoaded]);

  return (
    <View style={styles.container}>
      {(!mapLoaded || routeLoading) && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.white} />
        </View>
      )}
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          ...startPoint,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onMapReady={() => setMapLoaded(true)}
        onRegionChangeComplete={() => setMapLoaded(true)}>
        <Marker
          coordinate={startPoint}
          pinColor={colors.blue}
          title="Current Location"
          description="Current Location"
        />
        <Marker
          coordinate={endPoint}
          pinColor={colors.error}
          title="Destination"
          description="Destination"
        />
        {routeCoords.length > 1 && (
          <Polyline
            coordinates={routeCoords}
            strokeColor={colors.blue}
            strokeWidth={6}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
});

export default Map;
