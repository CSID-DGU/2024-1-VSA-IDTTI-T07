import React, { useEffect } from 'react';
import axios from 'axios';

const SendCodesComponent = ({ codes, onDataFetched, distances, predictedSpaces }) => {
    useEffect(() => {
        if (codes.length > 0) {
            fetchFilteredData(codes);
        }
    }, [codes]);

    const fetchFilteredData = async (codes) => {
        try {
            const response = await axios.post('http://15.165.123.36:8080/api/distance', { codes });
            console.log('Received Data:', response.data);
            // 받은 데이터를 distances와 함께 상위 컴포넌트로 전달
            onDataFetched(response.data, distances, predictedSpaces);
        } catch (error) {
            console.error('Error fetching filtered data:', error);
            onDataFetched([], distances, predictedSpaces);
        }
    };

    return null; // 렌더링할 것이 없으므로 null 반환
};

export default SendCodesComponent;
