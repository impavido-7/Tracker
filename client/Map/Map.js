/*
    This will contain the code for the Map
*/

import React, { useContext } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Polyline, Circle } from 'react-native-maps';

import { Context as LocationContext } from '../context/LocationContext';

const Map = () => {
  const { state: { currentLocation, locations } } = useContext(LocationContext);

  /*
    Unless we get an initial value to the "currentLocation" we will use 
    "ActivityIndicator" to see the spinner on the screen 
  */
  if(!currentLocation) {
    return (
      <ActivityIndicator
        size = "large"
        style = {{ marginTop: 200 }}
      />
    )
  }

  /*
    As the currentLocation has "latitude" and "longitude" ... We will be using thet 
    to show that location on the screen
  */
  /*
    Whwnever we update this "region" property, the map is going to automatically update 
    itself and recenter on the user and resume as well 
  */
  /*
    When we don't use a circle ... Our Map will be centered automatically 
    when the location changes ... If we try to browse through the map to see the 
    adjacent locations ... Our Map will be re-centered automatically ... SO we 
    can't see the adjacent locations properly
  */

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
      region={{
        ...currentLocation.coords,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
    >

      <Circle
        center = {currentLocation.coords}
        radius = {30}
        strokeColor = "rgba(158, 158, 255, 1.0)"
        fillColor = "rgba(158, 158, 255, 0.3)"
      />

      <Polyline
        lineDashPattern={[2]}
        coordinates = {locations.map(loc => loc.coords)}
      />

    </MapView>
  );
  /*
    "strokeColor" means the color of the border and 
    "fillColor" means the color inside the circle
  */
  
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default Map;
