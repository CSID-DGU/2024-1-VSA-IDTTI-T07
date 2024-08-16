import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import MLMapOverlay from './MLMapOverlay';

const MLMapMarker = ({ map, positions }) => {
    const { kakao } = window;
    const [activeOverlay, setActiveOverlay] = useState(null);

    useEffect(() => {
        console.log('Positions:', positions);
        console.log('Map:', map);
        if (positions.length > 0) {
            positions.forEach(position => {
                const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
                const imageSize = new kakao.maps.Size(24, 35);
                const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                const marker = new kakao.maps.Marker({
                    map: map,
                    position: position.latlng,
                    title: position.title,
                    image: markerImage
                });

                const overlayContent = document.createElement('div');
                overlayContent.className = 'info';
                overlayContent.style.display = 'none';

                const overlayComponent = (
                    <MLMapOverlay
                        title={position.title}
                        p_availableSpace={position.p_availableSpace} // 예측된 빈자리수
                        totalSpace={position.totalSpace} // 전체 주차면
                        address={position.address}
                        onClose={() => {
                            overlayContent.style.display = 'none';
                            setActiveOverlay(null);
                        }}
                    />
                );

                ReactDOM.render(overlayComponent, overlayContent);

                const overlay = new kakao.maps.CustomOverlay({
                    content: overlayContent,
                    map: map,
                    position: marker.getPosition(),
                    zIndex: 10
                });

                kakao.maps.event.addListener(marker, 'click', () => {
                    if (activeOverlay) {
                        activeOverlay.setMap(null);
                    }
                    overlay.setMap(map);
                    overlayContent.style.display = 'block';
                    setActiveOverlay(overlay);
                });
            });
        }
    }, [map, positions, activeOverlay]);

    return null;
};

export default MLMapMarker;
