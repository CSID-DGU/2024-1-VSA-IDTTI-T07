import React, { createContext, useState, useContext } from 'react';

// Create a Context
const PredictionContext = createContext();

// Create a provider component
export const PredictionProvider = ({ children }) => {
    const [prediction, setPrediction] = useState(null);

    return (
        <PredictionContext.Provider value={{ prediction, setPrediction }}>
            {children}
        </PredictionContext.Provider>
    );
};

// Custom hook for using context
export const usePrediction = () => useContext(PredictionContext);
