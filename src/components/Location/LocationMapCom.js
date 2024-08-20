import React, { useEffect, useState } from 'react';
import { useSearch } from '../Map/SearchContext';
import { useLatLng } from './LatLngContext'; // Context import
import '../Map/Map.css';
import ZoomButton from '../Button/ZoomButton';
import MyLocationButton from '../Button/MyLocationButton';

const LocationMapCom = () => {
    const { kakao } = window;
    const [map, setMap] = useState(null);
    const { searchQuery } = useSearch();
    const { setLatLng } = useLatLng(); // Use context to update latLng

    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.5582888178845, 127.00015068054199),
            level: 3
        };

        const map = new kakao.maps.Map(container, options);
        setMap(map);

        const marker = new kakao.maps.Marker({
            position: map.getCenter()
        });
        marker.setMap(map);

        // Create and display the overlay
        const overlayContent = document.createElement('div');
        overlayContent.style.padding = '10px';
        overlayContent.style.background = '#ffeb3b';  // Yellow background for emphasis
        overlayContent.style.color = '#000';  // Black text
        overlayContent.style.fontWeight = 'bold';  // Bold text
        overlayContent.style.border = '2px solid #f57c00';  // Orange border
        overlayContent.style.borderRadius = '5px';
        overlayContent.style.boxShadow = '0px 2px 10px rgba(0, 0, 0, 0.3)'; // Shadow for emphasis
        overlayContent.innerText = '클릭하여 목적지를 설정하세요';

        const customOverlay = new kakao.maps.CustomOverlay({
            content: overlayContent,
            map: map,
            position: marker.getPosition(),
            yAnchor: 1.5, // Position the overlay above the marker
            xAnchor: 0.5 // Center the overlay horizontally
        });

        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
            const latlng = mouseEvent.latLng;
            marker.setPosition(latlng);
            setLatLng({ lat: latlng.getLat(), lng: latlng.getLng() }); // Update context

            const message = `클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`;
            const resultDiv = document.getElementById('clickLatlng');
            resultDiv.innerHTML = message;

            // Update overlay position
            customOverlay.setPosition(latlng);
        });
    }, [kakao, setLatLng]);

    useEffect(() => {
        if (!searchQuery || !map) return;

        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(searchQuery, placesSearchCB);

        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                const bounds = new kakao.maps.LatLngBounds();
                for (let i = 0; i < data.length; i++) {
                    bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
                }
                map.setBounds(bounds);
            }
        }
    }, [searchQuery, map]);

    return (
        <div id="map" className="map-container">
            <div id="clickLatlng"></div>
            {map && (
                <>
                    <ZoomButton map={map} />
                    <MyLocationButton map={map} />
                </>
            )}
        </div>
    );
};

export default LocationMapCom;
