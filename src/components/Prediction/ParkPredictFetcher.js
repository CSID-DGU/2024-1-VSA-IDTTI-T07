import React, { useEffect } from 'react';
import axios from 'axios';
import { usePrediction } from '../../context/PredictionContext'; // 예측 데이터를 가져오기 위해 context 사용

const ParkPredictFetcher = ({ setPositions }) => {
    const { kakao } = window;
    const { prediction } = usePrediction(); // context에서 예측 데이터를 가져옴
    // console.log('Prediction data:', prediction);

    useEffect(() => {
        const fetchParkingData = async () => {
            try {
                // 예측 데이터가 배열인지 확인
                const predictionsArray = Array.isArray(prediction) ? prediction : [];
                // console.log('Normalized Prediction data:', predictionsArray);

                // 주차장 정보 가져오기
                const parkingResponse = await axios.get('http://localhost:8080/api/parking');

                // 주차장 정보와 예측 데이터를 결합
                const data = parkingResponse.data.map(parking => {
                    // 예측 데이터와 주차장 코드 매칭
                    const predictionData = predictionsArray.find(p => p.parking_code === parking.code);

                    return {
                        code: parking.code,
                        title: parking.parkingName,
                        totalSpace: parking.totalSpace,
                        p_availableSpace: predictionData ? predictionData.predicted_avail_park_space : null, // 예측된 빈자리수
                        address: parking.address,
                        latitude : parking.latitude,
                        longitude : parking.longitude,
                        latlng: new kakao.maps.LatLng(parking.latitude, parking.longitude)
                    };
                });

                setPositions(data); // 결합된 데이터를 positions 상태로 설정
            } catch (error) {
                console.error('Error fetching parking codes:', error);
            }
        };

        fetchParkingData();
    }, [prediction, setPositions, kakao]);

    return null; // 이 컴포넌트는 렌더링할 내용이 없습니다.
};

export default ParkPredictFetcher;
