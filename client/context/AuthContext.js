/*
  This AuthContext will be used by SignIn, SignUp, AccountScreen (to logout) 
*/
import createDataContext from './createDataContext';

// Importing trackerAPI to call the API
import trackerAPI from '../API/trackerAPI';
import { navigate } from '../Navigation/navigationRef';

// Importing AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

/*
  1) If the API request is successful get the JWT from API and store it on the device
  2) Dispatch an action to put the token in state object
  3) Navigate the user to the 'mainFLow' 

  1) If the API call fails, update the state with an error message
  2) Store that error message in SignUp component
*/

const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    case 'signin':
      return { errorMessage: '', token: action.payload };
    case 'clear_error_message':
      return { ...state, errorMessage: "" };
    case 'signout':
      return { token: null, errorMessage: '' };
    default:
      return state;
  }
};

const signup = (dispatch) => {
  /*
    This 'return' function is the actual function that will get called when 
    we used 'signup' in a component ... 
    As signup uses email, password 
  */
  return async ({ email, password }) => {
    // Make API request to SignUp with that email & password
    try {
      const response = await trackerAPI.post('/signup', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({ type: 'signin', payload: response.data.token });
      navigate('TrackList');
    } catch (err) {
      // To get what the error is we can use err.response.data or err.message
      dispatch({ type: "add_error", payload: 'Something went wrong'});
    }
  };
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    // Make API request to SignIn with that email & password
    // If we SignIn, modify our state and say that we are authenticated
    // Reflect an error message when signup fails
    try {
      const response = await trackerAPI.post('/signin', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({ type: 'signin', payload: response.data.token });
      navigate('TrackList');
    } catch (err) {
      // To get what the error is we can use err.response.data or err.message
      dispatch({ type: "add_error", payload: 'Something went wrong' });
    }
  };
};

const signout = (dispatch) => {
  return async () => {
    // SignOut
    await AsyncStorage.removeItem('token');
    dispatch({ type: "signout" });
    navigate('Signin');
  };
};

/*
  As we are using the same state for both SignIn & SignUp ... If we get some error 
  when we SignUp and if we navigate to SignIn we will see the same error
  To avoid this we will use "onWillBlur" & "onWillFocus" and we will call this function 
  So that we don't see that error
*/
const clearErrorMessage = (dispatch) => {
  return () => {
    dispatch({ type: 'clear_error_message' })
  }
}

/*
  Here we will first check if JWT is already present or not ... If it is not present then 
  we will move to SignUp screen, if it is present then we will directly move to 
  TrackCreate screen 

  As there is only one return statement here we can condense the code like this
*/
const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signin', payload: token });
    navigate('TrackList')
  }
  else {
    navigate('Signin');
  }
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout, clearErrorMessage, tryLocalSignin },
  { token: null, errorMessage: "" }
);
