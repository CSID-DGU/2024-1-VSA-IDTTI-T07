import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import MLMapOverlay from './MLMapOverlay';
import { usePrediction } from '../../context/PredictionContext'; // 예측 데이터를 가져오기 위해 context 사용

const MLMapMarker = ({ map, positions }) => {
    const { kakao } = window;
    const [activeOverlay, setActiveOverlay] = useState(null);
    const { prediction } = usePrediction(); // context에서 예측 데이터를 가져옴
    console.log('예측데이터:', prediction);

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

                // const result = prediction.predictions.find(item => item.parking_code === position.code);
                const result = prediction.predictions.find(item => item.parking_code.toString() === position.code);

                console.log("result : " + result);
                const overlayComponent = (
                    <MLMapOverlay
                        title={position.title}
                        p_availableSpace={result ? result.predicted_avail_park_space : null} // 객체의 특정 속성만 전달
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
