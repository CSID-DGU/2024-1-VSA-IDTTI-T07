import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import MLMapOverlay from './MLMapOverlay';
import { usePrediction } from '../../context/PredictionContext';
import SendCodesComponent from './SendCodesComponent'; // 새 컴포넌트 import

const MLMapMarker = ({ map, positions }) => {
    const { kakao } = window;
    const [activeOverlay, setActiveOverlay] = useState(null);
    const [distances, setDistances] = useState([]);
    const [filteredCodes, setFilteredCodes] = useState([]); // 필터링된 코드를 저장할 상태
    const { prediction } = usePrediction();

    const lat = 37.558050422481784;
    const longi = 127.0009223949609;

    useEffect(() => {
        if (positions.length > 0) {
            const newDistances = [];

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

                const distance = getDistanceFromLatLonInKm(lat, longi, position.latlng.Ma, position.latlng.La);
                newDistances.push({ code: position.code, distance: distance });

                const result = prediction.predictions.find(item => item.parking_code.toString() === position.code);

                const overlayComponent = (
                    <MLMapOverlay
                        title={position.title}
                        p_availableSpace={result ? result.predicted_avail_park_space : null}
                        totalSpace={position.totalSpace}
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

            setDistances(newDistances);

            // 거리가 1보다 작은 코드만 필터링
            const codes = newDistances
                .filter(item => item.distance < 1)
                .map(item => item.code);

            setFilteredCodes(codes);
            
        }
    }, [map, positions, activeOverlay]);

    return (
        <>
            <SendCodesComponent codes={filteredCodes} />
        </>
    );
};

export default MLMapMarker;

function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
    const R = 6371; 
    const dLat = deg2rad(lat2 - lat1); 
    const dLon = deg2rad(lng2 - lng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
}
