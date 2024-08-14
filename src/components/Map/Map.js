import React, { useEffect, useState } from 'react';
import MapMarker from './MapMarker';
import ParkingDataFetcher from '../DataControl/ParkingDataFetcher';
import './Map.css';
import ZoomButton from '../Button/ZoomButton';
import MyLocationButton from '../Button/MyLocationButton';

const Map = () => {
    const { kakao } = window;
    const [map, setMap] = useState(null);
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(37.5582888178845, 127.00015068054199),
            level: 3
        };

        var map = new kakao.maps.Map(container, options);
        // 장소 검색 객체를 생성합니다
        var ps = new kakao.maps.services.Places(); 

        // 키워드로 장소를 검색합니다
        ps.keywordSearch('청림 5길', placesSearchCB); 

        // 키워드 검색 완료 시 호출되는 콜백함수 입니다
        function placesSearchCB (data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
                // LatLngBounds 객체에 좌표를 추가합니다
                var bounds = new kakao.maps.LatLngBounds();

                for (var i=0; i<data.length; i++) {
                    
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }       

                // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
                map.setBounds(bounds);
            } 
        }
        setMap(map);
    }, []);

    return (
        <div id="map">
            <ParkingDataFetcher setPositions={setPositions} />
            {map && (
                <>
                    <MapMarker 
                        map={map} 
                        positions={positions}
                        />
                    <ZoomButton 
                        map={map}
                        />
                    <MyLocationButton
                        map={map}
                    />
                </>
            )}
        </div>
    );
};

export default Map;
