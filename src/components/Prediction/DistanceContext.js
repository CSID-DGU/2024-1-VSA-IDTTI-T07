import React, { createContext, useContext, useState } from 'react';

const DistanceContext = createContext();

export const DistanceProvider = ({ children }) => {
    const [distances, setDistances] = useState([]);

    return (
        <DistanceContext.Provider value={{ distances, setDistances }}>
            {children}
        </DistanceContext.Provider>
    );
};

export const useDistances = () => useContext(DistanceContext);
