import React, { useEffect, useState } from 'react';
import MLMapMarker from './MLMapMarker';
import ParkPredictFetcher from './ParkPredictFetcher';
import '../Map/Map.css';
import ZoomButton from '../Button/ZoomButton';
import MyLocationButton from '../Button/MyLocationButton';

const MLMap = () => {
    const { kakao } = window;
    const [map, setMap] = useState(null);
    const [positions, setPositions] = useState([]);
    const [parkingData, setParkingData] = useState([]); // 주차 데이터 상태 추가

    useEffect(() => {
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(37.5582888178845, 127.00015068054199),
            level: 3
        };

        var map = new kakao.maps.Map(container, options);
        setMap(map);
    }, []);

    return (
        <div className="map-container">
            <div id="map"></div>
            <div className="map-info">
                {/* 주차 정보 리스트 */}
                <ul>
                    {parkingData.map((item, index) => (
                        <li key={index}>
                            <h3>{item.parkingName}</h3>
                            <p>주소: {item.address}</p>
                            <p>기본 주차 요금(5분): {item.baseParkingFee} 원</p>
                            {/* <p>최대 일일 요금: {item.maxDailyFee} 원</p> */}
                        </li>
                    ))}
                </ul>
            </div>
            <ParkPredictFetcher setPositions={setPositions} />
            {map && (
                <>
                    <MLMapMarker 
                        map={map} 
                        positions={positions}
                        setParkingData={setParkingData} // 추가된 속성
                    />
                    <ZoomButton map={map} />
                    <MyLocationButton map={map} />
                </>
            )}
        </div>
    );
};

export default MLMap;
