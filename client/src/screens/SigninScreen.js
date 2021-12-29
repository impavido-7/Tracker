// This signin is similar to SignUp except for some changes 

import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { NavigationEvents } from 'react-navigation';

import AuthForm from '../../components/AuthForm';
import NavLink from '../../components/NavLink';

import { Context as AuthContext } from '../../context/AuthContext';

const SigninScreen = () => {

  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={clearErrorMessage}
      />
      <AuthForm
        headerText="Sign In to your Account"
        errorMessage={state.errorMessage}
        submitButtonText="Sign In"
        onSubmit={signin}
      />
      <NavLink
        routeName="Signup"
        text="Don't have an account? Sign up instead"
      />
    </View>
  );
};


SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 50,
    marginTop: 200,
    position: "absolute"
  }
});

export default SigninScreen;
