// Results.js
import React from 'react';
import { usePrediction } from '../context/PredictionContext';

const Results = () => {
    const { prediction } = usePrediction();

    if (!prediction) return <p>No prediction data available.</p>;

    return (
        <div>
            <h2>Prediction Results</h2>
            <ul>
                {prediction.predictions.map((item) => (
                    <li key={item.parking_code}>
                        Parking Code: {item.parking_code}, Available Spaces: {item.predicted_avail_park_space}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Results;
