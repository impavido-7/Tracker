import React, { useReducer } from 'react';

/*
  This file will contain source code to create context globally 
  This means we need to just use this file to create a global scope variables which 
  can be accessible by all the screens
*/
export default (reducer, actions, defaultValue) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions = {};
    for (let key in actions) {
      // This means calling the action by passing 'dispatch' as an argument (parameter)
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context: Context, Provider: Provider };
};
