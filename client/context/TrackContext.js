/*
  This Context should take the locations from the "LocationContext" that means 
  this "TrackContext" is dependent on "LocationContext"
*/
// import AsyncStorage from '@react-native-async-storage/async-storage';

import createDataContext from './createDataContext';
import trackerApi from '../API/trackerAPI';

const trackReducer = (state, action) => {
  switch(action.type) {
    case 'fetch_tracks':
      return action.payload;
    default:
      return state;
  }
};

const fetchTracks = dispatch => async () => {
  // const token = await AsyncStorage.getItem('token');

  // console.log();
  // console.log("===== getTracks =====");
  // console.log(token);
  // console.log();

  // const headers = {
  //   'Authorization': `Bearer ${token}`
  // }

  // console.log();
  // console.log("===== Headers =====");
  // console.log(headers);
  // console.log();

  // {
  //   headers: {
  //     'Authorization': `Bearer ${token}`
  //   }
  // }

  const response = await trackerApi.get('/tracks');
  dispatch({ type: 'fetch_tracks', payload: response.data });
};

const createTrack = dispatch => async (name, locations) => {
  // const token = await AsyncStorage.getItem('token');
  // const headers = {
  //   'Authorization': `Bearer ${token}`
  // }
  await trackerApi.post('/tracks', { name, locations });
};

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack },
  []
);