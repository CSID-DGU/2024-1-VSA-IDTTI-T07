import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ParkingDataFetcher = ({ setPositions }) => {
    const { kakao } = window;
    useEffect(() => {
        axios.get('http://localhost:8080/api/parking')
            .then(response => {
                const data = response.data.map(parkingCode => ({
                    title: parkingCode.parkingName, //주차장 이름
                    availParkSpace: parkingCode.availParkSpace, //주차 가능면
                    totalSpace: parkingCode.totalSpace, // 전체 주차면
                    address: parkingCode.address, // 주소
                    parkingType: parkingCode.parkingType, // 주차장 종류
                    operationType: parkingCode.operationType,// 운영구분
                    phoneNumber: parkingCode.phoneNumber,// 전화번호
                    freeOrNot: parkingCode.freeOrNot, // 유료 / 무료
                    nightFreeOpenName: parkingCode.nightFreeOpenName, //야간 무료 개방
                    weekdayOpenTime: parkingCode.weekdayOpenTime,// 평일 운영 시작시간
                    weekdayCloseTime: parkingCode.weekdayCloseTime,// 평일 운영 종료시간
                    weekendOpenTime: parkingCode.weekendOpenTime,//주말 운영 시작시간
                    weekendCloseTime: parkingCode.weekendCloseTime,//주말 운영 종료시간
                    holidayOpenTime: parkingCode.holidayOpenTime,//공휴일 운영 시작시간
                    holidayCloseTime: parkingCode.holidayCloseTime,//공휴일 운영 종료시간
                    saturdayFreeOrNot: parkingCode.saturdayFreeOrNot,//토요일 유/무료
                    holidayFreeOrNot: parkingCode.holidayFreeOrNot,//공휴일 유/무료
                    monthlyTicketAmount: parkingCode.monthlyTicketAmount,//월 정기권 금액
                    baseParkingFee: parkingCode.baseParkingFee,// 기본 주차 요금
                    baseParkingTime: parkingCode.baseParkingTime,//기본 주차 시간
                    additionalFee: parkingCode.additionalFee,//추가 단위 요금
                    additionalTime: parkingCode.additionalTime,//추가 단위 시간
                    maxDailyFee: parkingCode.maxDailyFee,//일 최대 요금
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
