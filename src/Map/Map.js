import React, { useEffect } from 'react';
import './Map.css';

const Map = () => {
    const { kakao } = window;

    useEffect(() => {
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(37.5582888178845, 127.00015068054199), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };

        var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        var positions = [
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

        // 마커 이미지의 이미지 주소입니다
        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

        let activeOverlay = null;

        positions.forEach(position => {
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(24, 35);

            // 마커 이미지를 생성합니다    
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: position.latlng, // 마커를 표시할 위치
                title: position.title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                image: markerImage // 마커 이미지 
            });

            // 커스텀 오버레이에 표시할 컨텐츠를 생성합니다
            var content = document.createElement('div');
            content.innerHTML = '<div class="wrap">' +
                '    <div class="info">' +
                '        <div class="title">' +
                position.title +
                '            <div class="close" title="닫기"></div>' +
                '        </div>' +
                '        <div class="body">' +
                '            <div class="img">' +
                '                <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70">' +
                '           </div>' +
                '            <div class="desc">' +
                '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
                '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
                '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
                '            </div>' +
                '        </div>' +
                '    </div>' +
                '</div>';

            // 마커 위에 커스텀 오버레이를 표시합니다
            var overlay = new kakao.maps.CustomOverlay({
                content: content,
                map: map,
                position: marker.getPosition()
            });

            // 오버레이를 숨겨둡니다
            overlay.setMap(null);

            // 닫기 버튼에 이벤트 리스너 추가
            content.querySelector('.close').addEventListener('click', () => {
                overlay.setMap(null);
            });

            // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
            kakao.maps.event.addListener(marker, 'click', () => {
                if (activeOverlay) {
                    activeOverlay.setMap(null);
                }
                overlay.setMap(map);
                activeOverlay = overlay;
            });
        });
    }, []);

    return (
        <div id="map"></div>
    );
};

export default Map;