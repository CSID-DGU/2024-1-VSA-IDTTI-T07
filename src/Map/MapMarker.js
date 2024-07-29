import React, { useEffect } from 'react';
import MapOverlay from './MapOverlay';

const MapMarker = ({ map, positions }) => {
    const { kakao } = window;
    let activeOverlay = null;

    useEffect(() => {
        if (positions.length > 0) {
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
        }
    }, [map, positions]);

    return null;
};

export default MapMarker;
