/*
  As our TrackContext is dependent on LocationContext ... And the best way to transfer
  information from one context to the other is by using a custom hook
*/

import { useContext } from 'react';

import { Context as TrackContext } from '../context/TrackContext';
import { Context as LocationContext } from '../context/LocationContext';

import { navigate } from '../Navigation/navigationRef';

export default () => {

  const { createTrack } = useContext(TrackContext);

  const {
    state: { locations, name },
    reset
  } = useContext(LocationContext);

  const saveTrack = async () => {
    await createTrack(name, locations);
    // Once we save the track we will reset the form 
    reset();
    /* 
      Once the form is save we will navigate to 'TrackList' so that we can see 
      our recorded data
    */
    navigate('TrackList');
  };

  return [saveTrack];

}

/*
  Here we need to just call this Hook from anywhere in the application and it will 
  save the track to the backend 
*/