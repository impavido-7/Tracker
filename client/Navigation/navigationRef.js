/*
  This file will contain the code that can be used for navigation 
  This is solely used for navigation by outside the React screens
*/

let navigator;

export const setNavigator = (nav) => {
  navigator = nav;
};

/*
  Here "routeName" is the screen we defined in the navigation like SignUp, SignIn etc ..
  "params" is the parameter that we need to share among the screens
*/
export const navigate = (routeName, params = null) => {
  navigator._navigation.navigate(routeName);
  if (params !== null)
    navigator._navigation.setParams(params);
  // navigator.dispatch(
  //   NavigationActions.navigate({
  //     routeName: routeName,
  //     params: params
  //   })
  // );
};
