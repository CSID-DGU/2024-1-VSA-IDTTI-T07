import React, { useEffect, useState } from 'react';
import MapMarker from './MapMarker';
import ParkingDataFetcher from '../DataControl/ParkingDataFetcher';
import './Map.css';
import ZoomButton from '../Button/ZoomButton';

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
        // // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        // var zoomControl = new kakao.maps.ZoomControl();
        // map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        setMap(map);
    }, []);

    const zoomIn = ()=>{
        if(map){
            map.setLevel(map.getLevel() - 1);
        }
    };

    const zoomOut = ()=>{
        if(map){
            map.setLevel(map.getLevel() + 1);
        }
    };

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
                        onZoomIn={zoomIn}
                        onZoomOut={zoomOut}
                        />
                </>
            )}
        </div>
    );
};

export default Map;
