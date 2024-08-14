// Map.js
import React, { useEffect, useState } from 'react';
import { useSearch } from './SearchContext';
import MapMarker from './MapMarker';
import ParkingDataFetcher from '../DataControl/ParkingDataFetcher';
import './Map.css';
import ZoomButton from '../Button/ZoomButton';
import MyLocationButton from '../Button/MyLocationButton';

const Map = () => {
    const { kakao } = window;
    const [map, setMap] = useState(null);
    const [positions, setPositions] = useState([]);
    const { searchQuery } = useSearch();

    useEffect(() => {
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(37.5582888178845, 127.00015068054199),
            level: 3
        };

        var map = new kakao.maps.Map(container, options);
        setMap(map);
    }, []);

    useEffect(() => {
        if (!searchQuery || !map) return;

        var ps = new kakao.maps.services.Places(); 

        ps.keywordSearch(searchQuery, placesSearchCB); 

        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                var bounds = new kakao.maps.LatLngBounds();

                for (var i = 0; i < data.length; i++) {
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }       

                map.setBounds(bounds);
            } 
        }
    }, [searchQuery, map]);

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