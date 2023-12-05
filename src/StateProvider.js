// import {createContext ,useContext ,useReducer} from "react";

// export const SetContext =createContext();

// export const  StateProvider =({reducer ,initialState , children}) =>{

//     <SetContext.Provider  value={useReducer (reducer ,initialState)}>
//     {children}
    
//     </SetContext.Provider>

// }

// export const useStateValue=()=>{
    
//     return useContext(SetContext)}


import React, { createContext, useContext, useReducer } from "react";

export const SetContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
  // Wrap the children inside the SetContext.Provider and provide the value.
  return (
    <SetContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </SetContext.Provider>
  );
};

export const useStateValue = () => {
  // You should call useContext inside a function component or custom hook.
  return useContext(SetContext);
};
