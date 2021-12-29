import React, { useContext } from 'react';
import { Input, Button } from 'react-native-elements';

import Spacer from './Spacer';
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../Hooks/useSaveTrack';

const TrackForm = () => {

  const {state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName
  } = useContext(LocationContext);

  const [saveTrack] = useSaveTrack();

  return (
    <>
      <Spacer>
        <Input 
          placeholder = "Enter name"
          value={name}
          onChangeText={changeName}
        />
      </Spacer>
      {
        /*
          When we click on "Start Recording" we need to both update the 
          currentLocation and need to send the location to the locations array
        */
      }
      {
        recording 
        ? 
          <Spacer>
            <Button 
              title="Stop Recording" 
              onPress={stopRecording}
            />
          </Spacer>
        : 
          <Spacer>
            <Button 
              title="Start Recording" 
              onPress={startRecording}
            />
          </Spacer>
      }
      {
        /*
          Here we need to save the track whenever we stopped the recording and 
          when there are some entries left in locations array
        */
      }
      <Spacer>
        {
          !recording && locations.length 
          ? 
            (
              <Button title="Save Recording" onPress={saveTrack} />
            )
          : 
            null
        }
      </Spacer>

    </>
  )
}

export default TrackForm;