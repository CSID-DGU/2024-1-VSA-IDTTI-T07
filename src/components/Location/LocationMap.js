import React, { useEffect } from 'react';

const LocationMap = () => {
    useEffect(() => {
        // 지도 컨테이너 DOM 요소에 접근
        const mapContainer = document.getElementById('map'); 
        const mapOption = { 
            center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

        // 지도 생성
        const map = new window.kakao.maps.Map(mapContainer, mapOption);

        // 지도에 마커 생성
        const marker = new window.kakao.maps.Marker({ 
            position: map.getCenter()
        });
        marker.setMap(map);

        // 지도에 클릭 이벤트 등록
        window.kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
            const latlng = mouseEvent.latLng; 
            marker.setPosition(latlng);

            const message = `클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`;
            const resultDiv = document.getElementById('clickLatlng'); 
            resultDiv.innerHTML = message;
        });
    }, []); // 빈 배열을 두어 컴포넌트가 마운트될 때만 실행되도록 설정

    return (
        <div>
            <div id="map" style={{ width: '500px', height: '400px' }}></div>
            <div id="clickLatlng"></div>
        </div>
    );
};

export default LocationMap;
