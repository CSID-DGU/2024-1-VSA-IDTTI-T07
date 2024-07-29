import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ParkingDataFetcher = ({ setPositions }) => {
    const { kakao } = window;
    useEffect(() => {
        axios.get('http://localhost:8080/api/parking-codes')
            .then(response => {
                const data = response.data.map(parkingCode => ({
                    title: parkingCode.parkingName,
                    latlng: new kakao.maps.LatLng(parkingCode.latitude, parkingCode.longitude)
                }));
                setPositions(data);
            })
            .catch(error => {
                console.error('Error fetching parking codes:', error);
            });
    }, [setPositions]);

    return null; // 이 컴포넌트는 렌더링할 내용이 없습니다.
};

export default ParkingDataFetcher;
