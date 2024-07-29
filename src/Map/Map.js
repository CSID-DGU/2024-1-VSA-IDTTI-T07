import React, { useEffect, useState } from 'react';
import MapMarker from './MapMarker';
import ParkingDataFetcher from '../component/data/ParkingDataFetcher';
import './Map.css';

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
        setMap(map);
    }, []);

    return (
        <div id="map">
            <ParkingDataFetcher setPositions={setPositions} />
            {map && (
                <MapMarker 
                    map={map} 
                    positions={positions} 
                />
            )}
        </div>
    );
};

export default Map;
