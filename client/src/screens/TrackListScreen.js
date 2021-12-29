import React, { useContext } from 'react';
import { View, StyleSheet, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { ListItem } from 'react-native-elements';

import { Context as TrackContext } from '../../context/TrackContext';

const TrackListScreen = ({ navigation }) => {

  const { state, fetchTracks } = useContext(TrackContext);

  return (
    <>
      {
        /*
          Whenever we move to this screen we will make an API call 
          to fetch all the recorded tracks
        */
      }
      <NavigationEvents onWillFocus={fetchTracks} />
      {
        /*
          As 'TrackDetail' is used in the same loop we can directly use TrackDetail
        */
      }

      <FlatList
        data = {state}
        keyExtractor = {item => item._id}
        renderItem = {({ item }) => {
          return(
            <TouchableOpacity
              onPress={() => 
                navigation.navigate('TrackDetail', { _id: item._id })
              }
            >
              <ListItem>
                <ListItem.Content>
                  <ListItem.Title> 
                    {item.name}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          )
        }}
      />
    </>
  );
}

TrackListScreen.navigationOptions = {
  title: 'Tracks'
}

export default TrackListScreen;