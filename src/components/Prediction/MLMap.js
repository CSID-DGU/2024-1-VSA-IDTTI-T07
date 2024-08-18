import React, { useEffect, useState } from 'react';
import { useLatLng } from '../Location/LatLngContext'; // Context import
import MLMapMarker from './MLMapMarker';
import ParkPredictFetcher from './ParkPredictFetcher';
import '../Map/Map.css';
import ZoomButton from '../Button/ZoomButton';
import MyLocationButton from '../Button/MyLocationButton';

const MLMap = () => {
    const { kakao } = window;
    const [map, setMap] = useState(null);
    const [positions, setPositions] = useState([]);
    const [parkingData, setParkingData] = useState([]);
    const { latLng } = useLatLng(); // Use context to get latLng

    useEffect(() => {
        if (!latLng) return;

        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(latLng.lat, latLng.lng),
            level: 4
        };

        var map = new kakao.maps.Map(container, options);
        setMap(map);
        console.log("데이터 확인용 : " + parkingData)
        // 마커 생성
        var marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(latLng.lat, latLng.lng),
            map: map
        });

        // 원 생성
        var circle = new kakao.maps.Circle({
            center: new kakao.maps.LatLng(latLng.lat, latLng.lng),
            radius: 500, // 반경 500m
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.2
        });
        circle.setMap(map);
        
    }, [latLng]);

    return (
        <div className="map-container">
            <div id="map"></div>
            <div className="map-info">
                {parkingData.length > 0 ? (
                    <ul>
                        {parkingData.map((item, index) => (
                            <li key={index}>
                                <h3>{item.parkingName}</h3>
                                <p>주소: {item.address}</p>
                                <p>기본 주차 요금(5분): {item.baseParkingFee} 원</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>주변에 주차장이 없습니다</p>
                )}
            </div>
            <ParkPredictFetcher setPositions={setPositions} />
            {map && (
                <>
                    <MLMapMarker 
                        map={map} 
                        positions={positions}
                        setParkingData={setParkingData} 
                    />
                    <ZoomButton map={map} />
                    <MyLocationButton map={map} />
                </>
            )}
        </div>
    );
};

export default MLMap;
