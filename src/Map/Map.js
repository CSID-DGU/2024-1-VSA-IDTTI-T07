import React, { useEffect, useState } from 'react';
import MapMarker from './MapMarker';
import './Map.css';

const Map = () => {
    const { kakao } = window;
    const [map, setMap] = useState(null);

    useEffect(() => {
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(37.5582888178845, 127.00015068054199),
            level: 3
        };

        var map = new kakao.maps.Map(container, options);
        setMap(map);
    }, []);

    const positions = [
        {
            title: '동국대학교',
            latlng: new kakao.maps.LatLng(37.5582888178845, 127.00015068054199)
        },
        {
            title: '이해랑극장',
            latlng: new kakao.maps.LatLng(37.55824859922506, 127.00330478578975)
        },
        {
            title: '명진관',
            latlng: new kakao.maps.LatLng(37.55773507703769, 127.00002263536378)
        },
        {
            title: '원흥관',
            latlng: new kakao.maps.LatLng(37.55905953536192, 126.99866448989897)
        },
        {
            title: '중앙도서관',
            latlng: new kakao.maps.LatLng(37.55796933294665, 126.99910590033201)
        }
    ];

    return (
        <div id="map">
            {map && positions.map((position, index) => (
                <MapMarker key={index} map={map} position={position} />
            ))}
        </div>
    );
};

export default Map;
