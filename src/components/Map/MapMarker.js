import React, { useEffect, useState } from 'react';
import MapOverlay from './MapOverlay';
import { useAuth } from '../Auth/AuthContext';
import ReactDOM from 'react-dom';

const MapMarker = ({ map, positions }) => {
    const { kakao } = window;
    const [activeOverlay, setActiveOverlay] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
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
                    <MapOverlay
                        title={position.title}
                        availParkSpace={position.availParkSpace}
                        totalSpace={position.totalSpace}
                        address={position.address}
                        parkingType={position.parkingType}
                        operationType={position.operationType}
                        phoneNumber={position.phoneNumber}
                        freeOrNot={position.freeOrNot}
                        nightFreeOpenName={position.nightFreeOpenName}
                        weekdayOpenTime={position.weekdayOpenTime}
                        weekdayCloseTime={position.weekdayCloseTime}
                        weekendOpenTime={position.weekendOpenTime}
                        weekendCloseTime={position.weekendCloseTime}
                        holidayOpenTime={position.holidayOpenTime}
                        holidayCloseTime={position.holidayCloseTime}
                        saturdayFreeOrNot={position.saturdayFreeOrNot}
                        holidayFreeOrNot={position.holidayFreeOrNot}
                        monthlyTicketAmount={position.monthlyTicketAmount}
                        baseParkingFee={position.baseParkingFee}
                        baseParkingTime={position.baseParkingTime}
                        additionalFee={position.additionalFee}
                        additionalTime={position.additionalTime}
                        maxDailyFee={position.maxDailyFee}
                        onClose={() => {
                            overlayContent.style.display = 'none';
                            setActiveOverlay(null);
                        }}
                        onFavoriteToggle={(newFavoriteState) => {
                            console.log("Favorite toggled:", newFavoriteState);
                        }}
                    />
                );

                ReactDOM.render(overlayComponent, overlayContent);

                const overlay = new kakao.maps.CustomOverlay({
                    content: overlayContent,
                    map: map,
                    position: marker.getPosition(),
                    zIndex: 10 // Set zIndex here
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

export default MapMarker;
