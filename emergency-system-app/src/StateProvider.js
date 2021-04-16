import React, { createContext, useContext, useReducer} from 'react'

export const StateContext = createContext(); //global state

//App wrapper -> provide global state trough the app
export const StateProvider = ({ reducer, initialState, children}) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
