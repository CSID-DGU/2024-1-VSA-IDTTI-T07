import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ParkingDataFetcher = ({ setPositions }) => {
    const { kakao } = window;
    useEffect(() => {
        axios.get('http://localhost:8080/api/parking-codes')
            .then(response => {
                const data = response.data.map(parkingCode => ({
                    title: parkingCode.parkingName,
                    address: parkingCode.address,
                    parkingType: parkingCode.parkingType,
                    operationType: parkingCode.operationType,
                    phoneNumber: parkingCode.phoneNumber,
                    freeOrNot: parkingCode.freeOrNot,
                    nightFreeOpenName: parkingCode.nightFreeOpenName,
                    weekdayOpenTime: parkingCode.weekdayOpenTime,
                    weekdayCloseTime: parkingCode.weekdayCloseTime,
                    weekendOpenTime: parkingCode.weekendOpenTime,
                    weekendCloseTime: parkingCode.weekendCloseTime,
                    holidayOpenTime: parkingCode.holidayOpenTime,
                    holidayCloseTime: parkingCode.holidayCloseTime,
                    saturdayFreeOrNot: parkingCode.saturdayFreeOrNot,
                    holidayFreeOrNot: parkingCode.holidayFreeOrNot,
                    monthlyTicketAmount: parkingCode.monthlyTicketAmount,
                    baseParkingFee: parkingCode.baseParkingFee,
                    baseParkingTime: parkingCode.baseParkingTime,
                    additionalFee: parkingCode.additionalFee,
                    additionalTime: parkingCode.additionalTime,
                    maxDailyFee: parkingCode.maxDailyFee,
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
