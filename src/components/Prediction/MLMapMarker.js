import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import MLMapOverlay from './MLMapOverlay';
import { usePrediction } from '../../context/PredictionContext'; // 예측 데이터를 가져오기 위해 context 사용

const MLMapMarker = ({ map, positions }) => {
    const { kakao } = window;
    const [activeOverlay, setActiveOverlay] = useState(null);
    const [distances, setDistances] = useState([]); // 거리와 코드를 저장할 상태
    const { prediction } = usePrediction(); // context에서 예측 데이터를 가져옴
    

    const lat = 37.558050422481784;
    const longi = 127.0009223949609;

    useEffect(() => {
        console.log('Positions:', positions);
        console.log('Map:', map);

        if (positions.length > 0) {
            const newDistances = []; // 새로운 배열을 생성

            positions.forEach(position => {
                const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
                const imageSize = new kakao.maps.Size(24, 35);
                const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                const marker = new kakao.maps.Marker({
                    map: map,
                    position: position.latlng,
                    title: position.title,
                    image: markerImage
                });

                const overlayContent = document.createElement('div');
                overlayContent.className = 'info';
                overlayContent.style.display = 'none';

                // 거리 계산
                const distance = getDistanceFromLatLonInKm(lat, longi, position.latitude, position.longitude);
                console.log("type_latitude : " +typeof(position.latitude))
                // 거리와 코드 쌍을 배열에 추가
                newDistances.push({ code: position.code, distance: distance });

                // const result = prediction.predictions.find(item => item.parking_code === position.code);
                const result = prediction.predictions.find(item => item.parking_code.toString() === position.code);

                console.log("result : " + result);
                const overlayComponent = (
                    <MLMapOverlay
                        title={position.title}
                        p_availableSpace={result ? result.predicted_avail_park_space : null} // 객체의 특정 속성만 전달
                        totalSpace={position.totalSpace} // 전체 주차면
                        address={position.address}
                        onClose={() => {
                            overlayContent.style.display = 'none';
                            setActiveOverlay(null);
                        }}
                    />
                );

                ReactDOM.render(overlayComponent, overlayContent);

                const overlay = new kakao.maps.CustomOverlay({
                    content: overlayContent,
                    map: map,
                    position: marker.getPosition(),
                    zIndex: 10
                });

                kakao.maps.event.addListener(marker, 'click', () => {
                    if (activeOverlay) {
                        activeOverlay.setMap(null);
                    }
                    overlay.setMap(map);
                    overlayContent.style.display = 'block';
                    setActiveOverlay(overlay);
                });
            });

            // distances 상태를 업데이트
            setDistances(newDistances);
            console.log('Calculated Distances:', distances);
        }
    }, [map, positions, activeOverlay]);

    return null;
};

export default MLMapMarker;


function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {//lat1:위도1, lng1:경도1, lat2:위도2, lat2:경도2
    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lng2 - lng1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}
