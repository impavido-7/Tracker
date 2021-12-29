import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

// Importing NavigationEvents so that we can use "onWillBlur" & "onWillFocus"
import { NavigationEvents } from 'react-navigation';

// Importing the common form & NavLink for signup & signin
import AuthForm from '../../components/AuthForm';
import NavLink from '../../components/NavLink';

// Importing Context
import { Context as AuthContext } from '../../context/AuthContext';

const SignupScreen = () => {
  // Getting the content from AuthContext here
  // state object will be aviable in state & signup function will be present in 'signup'
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>

      {
        /*
          We can't apply styles to React.Fragment so we are using View to wrap up the code
        */
      }

      {
        /*
          <NavigationEvents doesn't show anything on the screen ... but it will take 
          two callbacks as props which will be triggered whenever we navigate out 
          of screen or navigate to this screen
        */
      }
      <NavigationEvents
        onWillFocus={clearErrorMessage}
      />

      <AuthForm
        headerText="Sign Up for Tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}
      />

      {
        /*
          onSubmit={signup} is similar to 
          onSubmit={({ email, password }) => signup({ email, password })}
        */
      }

      <NavLink
        routeName="Signin"
        text="Already have an account? Sign in instead"
      />

      {
        /* 
          To navigate to 'SignIn' screen which is in same loop we can directly use 'SignIn'
          <Button
            title="Go to SignIn"
            onPress={() => navigation.navigate('Signin')}
          />

          To navigate to the "mainFLow" we can directly use 'mainFlow' which we used
          <Button
            title="Go to main flow"
            onPress={() => navigation.navigate('mainFlow')}
          />
        */
      }

    </View>
  );
};

SignupScreen.navigationOptions = () => {
  return {
    // To hide the header we can use this
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // To take up the entire screen we will use flex: 1
    justifyContent: 'center',
    marginBottom: 50,
    marginTop: 200,
    position: "absolute"
  }
});

export default SignupScreen;
