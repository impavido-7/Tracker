import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { FontAwesome } from '@expo/vector-icons';

import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// Importing Screens
import AccountScreen from './src/screens/AccountScreen';
import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';

// Importing Context
import { Provider as AuthProvider } from './context/AuthContext';
import { Provider as LocationProvider } from './context/LocationContext';
import { Provider as TrackProvider } from './context/TrackContext';

// Importing Navigator
// Here we used { } because it is not default export
import { setNavigator } from './Navigation/navigationRef';

/*
  As we wrapped two screens for the TrackList screen ... To add the 
  title and the icon we should proceed by this method 
*/
const trackListFlow = createStackNavigator({
  TrackList: TrackListScreen,
  TrackDetail: TrackDetailScreen
})

trackListFlow.navigationOptions = {
  title: "Tracks",
  tabBarIcon: <FontAwesome name="th-list" size={20} />
}

// To create a nested navigation which consists of multiple types of navigation
const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen,
  }),
  mainFlow: createBottomTabNavigator({
    trackListFlow: trackListFlow,
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen,
  }),
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          {/*
              As we used an alias name for context we can refer that Alias name to call ...
              Now the data that is in AuthContext will be available for every screen to   
              access To provide the navigation prop to the navigation ref we used the 
              "ref" prop in <App> 
          */}
          <App
            ref={(navigator) => {
              setNavigator(navigator);
            }}
          />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
