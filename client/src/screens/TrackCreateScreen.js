import React, { useContext, useCallback } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
/*
  When we use our component with "withNavigationFocus", it will receive a prop called 
  "isFocussed" which will tell whether our component is visible on screen or not
*/
import { withNavigationFocus } from 'react-navigation';
import { Text } from 'react-native-elements';

import Map from '../../Map/Map';
import { Context as LocationContext } from '../../context/LocationContext';
import useLocation from '../../Hooks/useLocation';
import TrackForm from '../../components/TrackForm';

import { FontAwesome } from '@expo/vector-icons';

import '../../Testing_the_Map/_mockLocation';

const TrackCreateScreen = ({ isFocused }) => {
  const { state, addLocation } = useContext(LocationContext);
  /*
    So whenever there is a change in "state.recording" we are re-initializing the 
    addLocation function ... So to overcome the issue with useEffect we can now 
    pass this "callback" as an argument to the dependency array ... 
  */
  const callback = useCallback(location => {
    addLocation(location, state.recording)
  }, [state.recording]);

  const [err] = useLocation(isFocused || state.recording, callback);
  /*
    This is similar to 
    const [err] = useLocation((location) => addLocation(location));

    We passed isFocussed || state.recording because we need to record the location if we
    navigate to TrackCreate screen or even if we move out and if the we set the recording 
    flag to true then we need to record it
    
  */
  return (
    <SafeAreaView style={styles.container}>
      <Text h3> Create a Track </Text>
      <Map />
      {err && <Text style={styles.locationError}> Please enable location services </Text>}
      <TrackForm />
    </SafeAreaView>
  );
};

/*
  To add an icon to the bottom tab navigation we used "tabBarIcon"
*/
TrackCreateScreen.navigationOptions = {
  title: 'Add Track',
  tabBarIcon: <FontAwesome name="plus" size={20} /> 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 50,
  },
  locationError: {
    color: 'red'
  }
});

export default withNavigationFocus(TrackCreateScreen);
