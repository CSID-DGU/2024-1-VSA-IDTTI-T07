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
            <ParkPredictFetcher setPositions={setPositions} />
            {map && (
                <>
                    <MLMapMarker 
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

export default MLMap;