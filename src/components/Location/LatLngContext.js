// LatLngContext.js
import React, { createContext, useContext, useState } from 'react';

const LatLngContext = createContext();

export const useLatLng = () => useContext(LatLngContext);

export const LatLngProvider = ({ children }) => {
    const [latLng, setLatLng] = useState({ lat: 37.5582888178845, lng: 127.00015068054199 });

    return (
        <LatLngContext.Provider value={{ latLng, setLatLng }}>
            {children}
        </LatLngContext.Provider>
    );
};
