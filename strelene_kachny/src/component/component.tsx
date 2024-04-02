import React, { createContext, useReducer, useContext } from 'react';

// Define the initial state
const initialState = {
    count: 0,
};

// Define the reducer function
const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + 1 };
        case 'DECREMENT':
            return { ...state, count: state.count - 1 };
        default:
            return state;
    }
};

// Create the context
const MyContext = createContext<any>(null);

// Create the provider component
const MyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <MyContext.Provider value={{ state, dispatch }}>
            {children}
        </MyContext.Provider>
    );
};

// Create a component that uses the context
const MyComponent: React.FC = () => {
    const { state, dispatch } = useContext(MyContext);

    return (
        <div>
            <h1>Count: {state.count}</h1>
            <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
            <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
        </div>
    );
};

export { MyProvider, MyComponent };