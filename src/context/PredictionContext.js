import React, { createContext, useState, useContext } from 'react';

// Create a Context
const PredictionContext = createContext();

// Create a provider component
export const PredictionProvider = ({ children }) => {
    // Initialize prediction as an empty array
    const [prediction, setPrediction] = useState([]);

    return (
        <PredictionContext.Provider value={{ prediction, setPrediction }}>
            {children}
        </PredictionContext.Provider>
    );
};

// Custom hook for using context
export const usePrediction = () => useContext(PredictionContext);
