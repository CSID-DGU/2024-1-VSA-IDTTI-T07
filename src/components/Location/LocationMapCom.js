import React, { useEffect, useState } from 'react';
import { useSearch } from '../Map/SearchContext';
import './LocationMap.css';
import ZoomButton from '../Button/ZoomButton';
import MyLocationButton from '../Button/MyLocationButton';

const LocationMapCom = () => {
    const { kakao } = window;
    const [map, setMap] = useState(null);
    const { searchQuery } = useSearch();

    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.5582888178845, 127.00015068054199),
            level: 3
        };

        const map = new kakao.maps.Map(container, options);
        setMap(map);

        // 마커 생성 및 설정
        const marker = new kakao.maps.Marker({
            position: map.getCenter()
        });
        marker.setMap(map);

        // 지도 클릭 이벤트 등록
        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
            const latlng = mouseEvent.latLng;
            marker.setPosition(latlng);

            const message = `클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`;
            const resultDiv = document.getElementById('clickLatlng');
            resultDiv.innerHTML = message;
        });
    }, [kakao]);

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
        <div>
            <div id="map" ></div>
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
