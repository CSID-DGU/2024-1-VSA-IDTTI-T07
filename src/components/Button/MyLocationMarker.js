const MyLocationMarker = (map, currentMarker, setMarker) => {
    const { kakao } = window;

    // 기존 마커가 존재하면 지도에서 제거합니다
    if (currentMarker) {
        currentMarker.setMap(null);
    }

    // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const lat = position.coords.latitude; // 위도
            const lon = position.coords.longitude; // 경도
            const locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
            const message = '<div style="padding:5px; text-align:center;">현재 위치</div>'; // 인포윈도우에 표시될 내용입니다

            // 새로운 마커를 생성하고 상태로 관리합니다
            const newMarker = displayMarker(locPosition, message);
            setMarker(newMarker);
        });
    } else {
        const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
        const message = 'geolocation을 사용할수 없어요..';
        const newMarker = displayMarker(locPosition, message);
        setMarker(newMarker);
    }

    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
    function displayMarker(locPosition, message) {
        const newMarker = new kakao.maps.Marker({
            map: map,
            position: locPosition
        });

        const iwContent = message; // 인포윈도우에 표시할 내용
        const iwRemoveable = true;

        const infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable
        });

        infowindow.open(map, newMarker);
        map.setCenter(locPosition);

        return newMarker; // 새로 생성된 마커를 반환합니다
    }
};

export default MyLocationMarker;
