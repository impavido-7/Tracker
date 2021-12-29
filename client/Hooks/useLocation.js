/*
  Here we are moving the common code that below to location to this hook
*/

import { useState, useEffect } from 'react';

/*
  expo-location is used to get the location. 
  requestForegroundPermissionsAsync is used to request the access to track the application
  watchPositionAsync is used to read the position 
*/
import {
  Accuracy,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from 'expo-location';

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null);

  useEffect(() => {
    let subscriber;
    /*
      This startWatching() will ask for permission requests when this screen is 
      visible ... If we click on "Deny" then the control will go to catch block
      where we set the error 
    */
    /*
      As a rule with "useEffect" we need to define the helper functions within the 
      useEffect only 
    */
    const startWatching = async () => {
      try {
        const { granted } = await requestForegroundPermissionsAsync();
        if (!granted) {
          throw new Error('Location permission not granted');
        }
        /*
        "Accuracy.BestForNavigation" means we want the highest accuracy ... It will 
        consume high battery power
        "timeInterval" is the time afyer which we want to get an update
        "distanceInterval" is the time after that distance we will get an update 
      */
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          callback
        );
      } catch (e) {
        setErr(e);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      /*
        As "watchPositionAsync" is a background process only way to remove the listening is 
        getting the value as "subscriber", this subscriber will have an function "remove()" 
        which will remove the listening
      */
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    }

    /*
      Here whenever we are unmounting our component we are removing the listener 
      This will ensure that we will be having only one listener at a time
    */
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);
  /*
    As we passed the function callback in "useCallback" this function will
    change only when state.recording changes ... And once that change we will render
    this useEffect again
  */

  return [err];
};
