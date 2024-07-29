import React, { useEffect } from 'react';
import MapOverlay from './MapOverlay';

// const MapMarker = ({ map, activeOverlay, setActiveOverlay }) => {
    const MapMarker = ({ map}) => {
    const { kakao } = window;

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
    let activeOverlay = null;
    useEffect(() => {
        positions.forEach(position => {
            var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
            var imageSize = new kakao.maps.Size(24, 35);
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            var marker = new kakao.maps.Marker({
                map: map,
                position: position.latlng,
                title: position.title,
                image: markerImage
            });

            var overlayContent = MapOverlay({ title: position.title });
            var overlay = new kakao.maps.CustomOverlay({
                content: overlayContent,
                map: map,
                position: marker.getPosition()
            });

            overlay.setMap(null);

            kakao.maps.event.addListener(marker, 'click', () => {
                if (activeOverlay) {
                    activeOverlay.setMap(null);
                }
                overlay.setMap(map);
                activeOverlay = overlay;
            });
        });
    // }, [map, activeOverlay, setActiveOverlay]);
}, [map]);
    return null;
};

export default MapMarker;
